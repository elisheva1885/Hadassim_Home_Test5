import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

const AdminOrders = () => {
    
    const { token } = useSelector(state => state.token)
    const [orders, setOrders] = useState([])
    const { products } = useSelector(state => state.products)
    const navigate = useNavigate()
    const getAllOrders = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            const res = await axios.get(`http://localhost:8000/api/orders/all`, { headers })
            if (res.status === 200) {
                setOrders(res.data)
            }
        }
        catch (error) {
            if (error.status === 401)
                alert("Unauthorized")
            if (error.status === 403)
                alert("Forbidden")
            if (error.status === 404)
                alert("You have never order anything")

        }
    }

    const toExistingOrders = async () => {
        navigate('/admin/view/existingOrders')
    }

    const header = (
        <img alt="Order" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );


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
                padding: '5px', 
                border: '1px solid #ccc', 
                borderRadius: '8px', 
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', 
                backgroundColor: '#fff', 
            };

            return (
                <div className="card-container" style={cardContainerStyle} >
                    <Card style={cardStyle} title="Order"  header={header} className="w-64 max-w-full mx-2" >
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
            )
        })
    }

    useEffect(() => {
        getAllOrders();
    }, []);
    return (
        <>
            <div style={{ paddingTop: '60px' }}>
                <Button label="For only existing orders" onClick={toExistingOrders} />
                {ordersCards()}
            </div>
        </>
    )
}
export default AdminOrders