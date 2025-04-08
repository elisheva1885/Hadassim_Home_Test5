import {useSelector } from "react-redux"
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../FormDemo.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios'
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router";

const AdminHome = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const { products } = useSelector(state => state.products)
    const navigate = useNavigate()

    const SupplierToSend = (supplier) => {
        const navigationData = {
            supplier: supplier,
        };
        navigate('/admin/createOrder', { state: navigationData })
    }

    const defaultValues = {
        product: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        getSupplierByProduct(data.product)
        setFormData(data);
        setShowMessage(true);
    };

    const getSupplierByProduct = async (data) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/suppliers/${data}`)
            if (res.status === 200) {
                setSuppliers(res.data)
            }
        }
        catch (error) {
            if (error.status === 404)
                alert("no supplier have this product")
        }
    }

    return (
        <>
            <div style={{ paddingTop: '60px' }}>
                <h2> Hello Admin! </h2>
                <br />
                <p> To make the ordering process as convenient as possible, please follow these steps:
                    <br />
                    Select the product you wish to order.
                    <br />
                    Choose your preferred supplier for the product.
                    <br />
                    Select the products and quantities from the available options offered by the selected supplier.
                    <br />
                </p>
            </div>
            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">Order</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="product" control={control} render={({ field }) => (
                                            <Dropdown id={field.label} value={field.value} onChange={(e) => field.onChange(e.value)} options={products ? products : []} optionLabel="label" itemTemplate={(item) => (
                                                <div>
                                                    <span>{item.label}</span> <span style={{ fontWeight: 'bold' }}>-  ₪ {item.price}</span>
                                                </div>
                                            )} />
                                        )} />
                                        <label htmlFor="product">Products</label>
                                    </span>
                                </div>
                            </div>

                            <div className="card flex justify-content-center">
                                <Button label="Get Supplier of this product" icon="pi pi-external-link" onClick={() => { setVisible(true) }} />
                                <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                    <p className="m-0">
                                        {suppliers?.map((supplier) => { <>{supplier.companyName}, {supplier.representative_Name}</> })}
                                    </p>
                                    <p className="m-0">
                                        {suppliers?.map((supplier) => `${supplier.companyName} - ${supplier.representative_Name}`).join(', ')}
                                    </p>
                                </Dialog>

                                <Dialog header="Choose representative from company" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                    <div className="m-0">
                                        {suppliers?.map((supplier, index) => (
                                            <Button
                                                key={index}
                                                label={`${supplier.companyName} - ${supplier.representative_Name}`}
                                                className="p-button p-button-text p-mb-2"
                                                onClick={() => SupplierToSend(supplier)}// Optional: handle button click event
                                            />
                                        ))}
                                    </div>
                                </Dialog>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminHome