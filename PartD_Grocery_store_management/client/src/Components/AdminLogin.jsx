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
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../Store/Slices/productsSlice';
import { useNavigate } from "react-router";
import { setSupplierDetails } from '../Store/Slices/supplierDetailsSlice';
import { setToken } from '../Store/Slices/tokenSlice';

export const AdminLogin = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    // const [products, setProducts] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);
    const [visible, setVisible] = useState(false);
    // const productsContext = useContext(ProductsContext) 
    // const products = productsContext.products
    // const setProducts = productsContext.setProducts
    const {products} = useSelector((state) => state.products);
    const {supplierDetails} = useSelector((state) => state.supplierDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("at the start of the compinent",products);

    const defaultValues = {
        Admin_Name: '',
        Admin_Password: '',
    }
    const goToHome = ()=> {
        navigate("/admin/home")
    }
   

    const loginAdmin = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/admin/login", data)
            if (res.status === 201) {
                alert("hello admin of the system")
                console.log("res.data",res.data);
                dispatch(setToken(res.data.token))
                // dispatch(setSupplierDetails(res.data))
                // console.log("after setting",supplierDetails);
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

    useEffect(() => {
    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        loginAdmin(data)
        setFormData(data);
        setShowMessage(true);
        // reset();
    };

   

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    // const passwordFooter = (
    //     <React.Fragment>
    //         <Divider />
    //         <p className="mt-2">Suggestions</p>
    //         <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
    //             <li>At least one lowercase</li>
    //             <li>At least one uppercase</li>
    //             <li>At least one numeric</li>
    //             <li>Minimum 8 characters</li>
    //         </ul>
    //     </React.Fragment>
    // );
    return (

        <div className="form-demo">
            {/* <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog> */}

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