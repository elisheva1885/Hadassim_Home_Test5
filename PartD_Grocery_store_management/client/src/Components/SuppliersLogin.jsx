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

export const SuppliersLogin = () => {
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
        companyName: '',
        representative_Name: '',
        password: '',
    }
    const goToSupplierOrders = ()=> {
        navigate("/supplier/orders")
    }
   

    const loginSupplier = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", data)
            if (res.status === 201) {
                alert("supplier logined successfully")
                console.log("res.data",res.data);
                dispatch(setSupplierDetails(res.data))
                console.log("after setting",supplierDetails);
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
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader}  />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        {/* <div className="field">
                            <MultiSelect
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
                            />

                            <div className="card flex justify-content-center">
                                <Button label="ToAddProduct" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                                <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                                    <p className="m-0">
                                    <CreateProduct/>
                                    </p>
                                </Dialog>
                            </div>
                        </div> */}
                        {/* <div className="field-checkbox">
                            <Controller name="accept" control={control} rules={{ required: true }} render={({ field, fieldState }) => (
                                <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>I agree to the terms and conditions*</label>
                        </div> */}

                        <Button type="submit" label="Login" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SuppliersLogin