import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
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
import CreateProduct from './CreateProduct';
import { useNavigate } from "react-router";

export const SuppliersRegister = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);
    const [supplierProducts, setSupplierProducts] = useState([])
    const navigate = useNavigate();

    const defaultValues = {
        companyName: '',
        phoneNumber: '',
        representative_Name: '',
        password: '',
        productsList: supplierProducts
    }
    const goToLogin = () => {
        alert("To view your orders login to the system")
        navigate("/suppliersLogin")
    }


    const createSupplier = async (data) => {
        try {
            setSupplierProducts(supplierProducts.map(supplierProduct => {
                return supplierProduct = {
                    _id: supplierProduct.value,
                    name: supplierProduct.label,
                    price: supplierProduct.price,
                    minimum_quantity: supplierProduct.minimum_quantity
                }
            }))
            data.productsList = supplierProducts
            const res = await axios.post("http://localhost:8000/api/suppliers/auth/register", data)
            if (res.status === 201) {
                alert("supplier registered successfully")
                goToLogin()

            }
        }
        catch (error) {
            if (error.status === 409) {
                alert("this supplier already exist")
            }
        }
    }

    const handleAddProduct = (newProduct) => {
        setSupplierProducts((supplierProducts) => [...supplierProducts, newProduct]);  
    };

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        if (supplierProducts.length === 0) {
            alert("Please add at least one product.");
            return;
        }
        createSupplier(data)
        setFormData(data);
        setShowMessage(true);
    };



    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );
    return (
        <div style={{ paddingTop: '60px' }}>

            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">Register</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="companyName" control={control} rules={{ required: 'companyName is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="companyName" className={classNames({ 'p-error': errors.companyName })}>companyName*</label>
                                </span>
                                {getFormErrorMessage('companyName')}
                            </div>
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <Controller name="phoneNumber" control={control} rules={{ required: 'phoneNumber is required.' }}
                                        render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                    <label htmlFor="phoneNumber" className={classNames({ 'p-error': errors.phoneNumber })}>phoneNumber*</label>
                                </span>
                                {getFormErrorMessage('phoneNumber')}
                            </div>
                            <div className="field">
                                <span className="p-float-label p-input-icon-right">
                                    <Controller name="representative_Name" control={control} rules={{ required: 'representative_Name is required.' }}
                                        render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                    <label htmlFor="representative_Name" className={classNames({ 'p-error': !!errors.representative_Name })}>representative Name*</label>
                                </span>
                                {getFormErrorMessage('representative_Name')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <div className="field">
                                <div className="card flex justify-content-center">
                                    <Button type="button" label="add your products" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                                    <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                        <p className="m-0">
                                            <CreateProduct onAddProduct={handleAddProduct} />
                                        </p>
                                    </Dialog>
                                </div>
                                <h3>Product List:</h3>
                                <div className="product-list">
                                    {supplierProducts.map((product, index) => (
                                        <div className="product-card" key={index}>
                                            <h4>{product.label}</h4>
                                            <p><strong>Price:</strong> ₪ {product.price}</p>
                                            <p><strong>Minimum Quantity:</strong> {product.minimum_quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit" label="Register" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuppliersRegister