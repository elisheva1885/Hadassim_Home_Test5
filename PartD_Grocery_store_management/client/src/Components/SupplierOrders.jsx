import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";

const SupplierOrders = () => {
    const { token } = useSelector(state => state.token)
    const [orders, setOrders] = useState([])
    const [messages, setMessages] = useState([])

    const { products } = useSelector(state => state.products)

    const getSupplierOrders = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const res = await axios.get(`http://localhost:8000/api/orders/supplier`, { headers })
            if (res.status === 200) {
                setOrders(res.data)
            }
        }
        catch (error) {
            if (error.status === 401)
                alert("Unauthorized")
            if (error.status === 404)
                alert("You have no new orders")
        }
    }

    const getSupplierMessages = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const res = await axios.get(`http://localhost:8000/api/messages`, { headers })
            if (res.status === 200) {
                setMessages(res.data)
            }
        }
        catch (error) {

        }
    }

    const updateStatus = async (order_id) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const data = {
                _id: order_id
            }
            const res = await axios.put('http://localhost:8000/api/orders/supplier', data, { headers })
            if (res.status === 201) {
                alert("status updated - order In progress")
            }
        }
        catch (error) {
            if (error.status === 403) {
                alert("not found order")
            }
            if (error.status === 400) {
                alert("error on updating status")
            }
            if (error.status === 404) {
                alert("no such order")
            }

        }
    }

    const markAsRead = async (order_id) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const data = {
                _id: order_id
            }
            const res = await axios.put('http://localhost:8000/api/messages', data, { headers })
            if (res.status === 201) {
                alert("message read")
            }
        }
        catch (error) {
            if (error.status === 403) {
                alert("not found message")
                if (error.status === 400) {
                    alert("error on reading message")
                }
                if (error.status === 404) {
                    alert("no such order")
                }

            }

        }
    }

    const header = (
        <img alt="Order" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (order) => {
        if (order.status === 'created') {
            return (
                <Button label="Order Confirmation" style={{ width: '100%' }} onClick={() => updateStatus(order._id)} />
            )
        }
    }

    const ordersCards = () => {
        return orders?.map(order => {
            const orderProducts = order.products
            const productAndAmount = orderProducts?.map(orderProduct => {
                const product = products?.find(product => product.value === orderProduct.product);
                return {
                    label: product?.label,
                    amount: orderProduct.amount
                };
            });

            const cardContainerStyle = {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '10px',
            };

            const cardStyle = {
                width: '25%',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
            };

            return (
                <div className="card-container" style={cardContainerStyle}>
                    <Card style={cardStyle} title="Order" footer={() => footer(order)} header={header} className="w-64 max-w-full mx-2" >
                        <p className="m-0">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            {productAndAmount?.map((item, index) => (
                                <div key={index}>
                                    <div>item:{item.label}</div>
                                    <div>Amount: {item.amount}</div>
                                    <br />
                                </div>
                            ))}
                            <h4>status: {order.status}</h4>
                        </p>
                    </Card>
                </div>
            )
        })
    }

    useEffect(() => {
        getSupplierMessages()
        getSupplierOrders();
    }, []);

    return (
        <div style={{ paddingTop: '60px' }}>
            <div className="p-4 bg-gray-100 shadow-md">

                {messages.length > 0 ? <h3>🔔 New Messages:</h3> : <></>}
                {messages.map((msg) => (
                    <div key={msg._id} className="flex items-center justify-between bg-white p-3 my-2 rounded shadow-sm">
                        <div>
                            <p><strong>Order ID:</strong> {msg.order}</p>
                            <p><strong>Date:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
                            <h4>The order completed!!</h4>
                        </div>
                        {!msg.read && (
                            <Button
                                label="Mark as Read"
                                icon="pi pi-check"
                                onClick={() => markAsRead(msg._id)}
                                className="p-button-success"
                            />
                        )}
                    </div>
                ))}
            </div>
            {ordersCards()}
        </div>

    )
}

export default SupplierOrders