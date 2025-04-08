import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import '../FormDemo.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../Store/Slices/productsSlice';


const CreateProduct = ({onAddProduct}) => {
    const [showMessage, setShowMessage] = useState(false);
    const {products} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    console.log("at the start of the compinent", products);
    const defaultValues = {
        name: '',
        price: '',
        minimum_quantity: ''
    }


    const createProduct = async (data) => {
        try {
            const res = await axios.post("http://localhost:8000/api/products", data)
            if (res.status === 201) {
                alert("product added successfully")
                dispatch(setProducts([...products,{ label: res.data.name, value: res.data._id , price: res.data.price , minimum_quantity: res.data.minimum_quantity}]))
                const newProduct = {
                    name: res.data.name,
                    _id: res.data._id ,
                    price: res.data.price,
                    minimum_quantity: res.data.minimum_quantity
                };
                onAddProduct(newProduct);  
            }
        }
        catch (error) {
            if (error.status === 409) {
                alert("this product already exist")
            }
            else if (error.status === 400) {
                alert("all details reqired")
            }
        }
    }


    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onsubmit = (data) => {
        createProduct(data)
        reset();
    };



    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (
        <div style={{ paddingTop: '60px' }}>
        <form onSubmit={handleSubmit(onsubmit)} className="p-fluid">
            <div className="field">
                <span className="p-float-label">
                    <Controller name="name" control={control} rules={{ required: 'name is required.' }} render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                    )} />
                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>name*</label>
                </span>
                {getFormErrorMessage('name')}
            </div>
            <br />
            <div className="field">
                <div className="flex">
                    <span className="p-float-label">
                        <Controller name="price" control={control} rules={{ required: 'price is required.' }} render={({ field }) => (
                            <InputText id="price" {...field} />
                        )} />
                        <label htmlFor="price">price</label>
                    </span>
                    {getFormErrorMessage('price')}
                </div>
                <br />
                <div >
                    <span className="p-float-label">
                        <Controller name="minimum_quantity" control={control} rules={{ required: 'minimum_quantity is required.' }} render={({ field }) => (
                            <InputText id="minimum_quantity" {...field} />
                        )} />
                        <label htmlFor="minimum_quantity">minimum quantity</label>
                    </span>
                    {getFormErrorMessage('minimum_quantity')}
                </div>
            </div>
            <br />
            <Button type="submit" label="Submit" className="mt-2" />
        </form>
        </div>
    )
}
export default CreateProduct