import { useDispatch, useSelector } from "react-redux"
import { setCompanies } from "../Store/Slices/companiesSlice";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { MultiSelect } from 'primereact/multiselect';
import '../FormDemo.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios'
import { Dropdown } from "primereact/dropdown";
import { setProducts } from "../Store/Slices/productsSlice";
import { useNavigate } from "react-router";




const AdminHome = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    // const { companies } = useSelector(state => state.companies)
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
            console.log(data);
            const res = await axios.get(`http://localhost:8000/api/suppliers/${data}`)
            if (res.status === 200) {
                setSuppliers(res.data)
                console.log("SuppliersRegister", res.data);
            }
        }
        catch (error) {
            if (error.status === 404)
                alert("no supplier have this product")
        }
    }


    // const getCompanies = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:8000/api/suppliers")
    //         if (res.status === 200) {
    //             dispatch(setCompanies(res.data))
    //             console.log("res.data", res.data);
    //             console.log("companies", companies);
    //         }
    //     }
    //     catch (error) {
    //         if (error.status === 404) {
    //             alert("not found")
    //         }
    //         else if (error.status === 400) {
    //             alert("all details reqired")
    //         }
    //     }
    // }
    // const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;


    // useEffect(() => {
    //     getCompanies()
    // }, []);
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
                                {/* <MultiSelect
                                value={selectedItems}
                                options={products}
                                onChange={(e) => {
                                    setSelectedItems(e.value);
                                    setSelectAll(e.value.length === products.length);
                                }}
                                selectAll={selectAll}
                                onSelectAll={(e) => {
                                    setSelectedItems(e.checked ? [] : products?.map((product) => product.value));
                                    setSelectAll(!e.checked);
                                }}
                                virtualScrollerOptions={{ itemSize: 43 }}
                                maxSelectedLabels={3}
                                placeholder="Select Items"
                                className="w-full md:w-20rem"
                            /> */}
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