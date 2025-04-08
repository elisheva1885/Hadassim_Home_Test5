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
import { useDispatch} from 'react-redux';
import { useNavigate } from "react-router";
import { setToken } from '../Store/Slices/tokenSlice';

export const AdminLogin = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultValues = {
        Admin_Name: '',
        Admin_Password: '',
    }
    const goToHome = ()=> {
        navigate("/admin/navigate")
    }
   
    const loginAdmin = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/admin/login", data)
            if (res.status === 201) {
                alert("hello admin of the system")
                dispatch(setToken(res.data.token))
                goToHome()

            }
        }
        catch (error) {
            if (error.status === 403) {
                alert("No Access")
            }
            else if (error.status === 400) {
                alert("all details reqired")
            }
        }
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        loginAdmin(data)
        setFormData(data);
        setShowMessage(true);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;

    return (

        <div className="form-demo" style={{ paddingTop: '60px' }}>
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Admin Login</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="Admin_Name" control={control} rules={{ required: 'Admin_Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="Admin_Name" className={classNames({ 'p-error': errors.Admin_Name })}>Admin_Name*</label>
                            </span>
                            {getFormErrorMessage('Admin_Name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="Admin_Password" control={control} rules={{ required: 'Admin_Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader}  />
                                )} />
                                <label htmlFor="Admin_Password" className={classNames({ 'p-error': errors.Admin_Password })}>Admin_Password*</label>
                            </span>
                            {getFormErrorMessage('Admin_Password')}
                        </div>         
                        <Button type="submit" label="Login" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin