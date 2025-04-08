import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";

const AdminExistsOrders = () => {

    const { token } = useSelector(state => state.token)
    const { products } = useSelector(state => state.products)
    const [orders, setOrders] = useState([])

    const getExistsOrders = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            console.log(token);

            const res = await axios.get(`http://localhost:8000/api/orders`, { headers })
            if (res.status === 200) {
                setOrders(res.data)
            }
        }
        catch (error) {
            if (error.status === 401)
                alert("Unauthorized")
            if (error.status === 404)
                alert("no orders on status In process")
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
            const res = await axios.put('http://localhost:8000/api/orders', data, { headers })
            if (res.status === 201) {
                alert("status updated the order Completed")
            }
        }
        catch (error) {
            if (error.status === 403) {
                alert("not allow to change status to this order")
            }
            if (error.status === 400) {
                alert("error on updating status")
            }
            if (error.status === 404) {
                alert("no such order")
            }
            }
        }


    const header = (
        <img alt="Order" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (order_id) => (
        <>
            <Button label="Order Confirmation" style={{ width: '100%' }} onClick={() => updateStatus(order_id)} />
        </>
    );

    const ordersCards = () => {
        return orders?.map(order => {
            const orderProducts = order.products
            console.log(orderProducts);

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
                alignItems: 'flex-start', // changed from center
                flexWrap: 'wrap',         // allows multiple cards in a row
                gap: '10px',              // space between cards
                padding: '10px',          // optional, for breathing room
            };

            const cardStyle = {
                width: '25%', // Set small width
                padding: '5px', // Add padding for content
                border: '1px solid #ccc', // Add a simple border
                borderRadius: '8px', // Optional: rounded corners
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional: soft shadow effect
                backgroundColor: '#fff', // White background
            };

            return (
                <>
                    <div className="card-container" style={cardContainerStyle}>
                        <Card style={cardStyle} title="Order" footer={() => footer(order._id)} header={header} className="w-64 max-w-full mx-2" >
                            <p className="m-0">
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
                </>
            )
        })
    }

    useEffect(() => {
        getExistsOrders();
    }, []);
    return (
        <>
            <div style={{ paddingTop: '60px' }}>
                {ordersCards()}
            </div>
        </>
    )
}
export default AdminExistsOrders