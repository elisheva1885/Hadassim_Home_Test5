import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import '../FormDemo.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { setToken } from '../Store/Slices/tokenSlice';

export const SuppliersLogin = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultValues = {
        companyName: '',
        representative_Name: '',
        password: '',
    }
    const goToSupplierOrders = () => {
        navigate("/supplier/orders")
    }

    const loginSupplier = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/suppliers/auth/login", data)
            if (res.status === 201) {
                alert("supplier logined successfully")
                dispatch(setToken(res.data.token))
                goToSupplierOrders()
            }
        }
        catch (error) {
            if (error.status === 401) {
                alert("Unauthorized")
            }
            else if (error.status === 400) {
                alert("all details reqired")
            }
        }
    }

    useEffect(() => {
    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        loginSupplier(data)
        setFormData(data);
        setShowMessage(true);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const passwordHeader = <h6>Pick a password</h6>;

    return (
        <div style={{ paddingTop: '60px' }}>
            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">Login</h5>
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
                                <span className="p-float-label">
                                    <Controller name="representative_Name" control={control} rules={{ required: 'representative_Name is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="representative_Name" className={classNames({ 'p-error': errors.representative_Name })}>representative_Name*</label>
                                </span>
                                {getFormErrorMessage('representative_Name')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <Button type="submit" label="Login" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuppliersLogin