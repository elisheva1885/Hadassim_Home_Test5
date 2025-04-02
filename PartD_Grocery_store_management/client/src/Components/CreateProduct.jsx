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
import ProductsContext, { ProductsProvider } from '../Context/ProductsContext';
const CreateProduct= ()=> {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);
    const [visible, setVisible] = useState(false);
    const productsContext = useContext(ProductsContext) 
    const products = productsContext.products
    const setProducts = productsContext.setProducts 
        console.log("at the start of the compinent",products);
    const defaultValues = {
        name: '',
        price: '',
        minimum_quantity: ''
    }

    // const getProducts = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:8000/api/products')
    //         if (res.status === 200) {
    //             // setProducts((res.data))
    //             // setProducts(Array.from(res.data).map((product) => ({ label: product.name, value: product._id })))
    //             setProducts((res.data).map((product) => ({ label: product.name, value: product._id })))
    //             console.log("SuppliersRegister", products);
    //         }
    //     }
    //     catch (error) {
    //         if (error.status === 404)
    //             alert("no products you welcome to add")
    //     }
    // }

    const createProduct = async (data) => {
        try{
            const res =await axios.post("http://localhost:8000/api/products" , data)
            if(res.status===201){
                alert("product added successfully")
                setProducts(products.push({ label: res.data.name, value: res.data._id }))
                // console.log(products);
                // ProductsProvider.setProducts(ProductsProvider.products.push(res.data))
                // console.log(ProductsProvider);

            }
        }
        catch(error){
            if(error.status === 409){
                alert("this product already exist")
            }
            else if(error.status === 400){
                alert("all details reqired")
            }
        }
    }


    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        createProduct(data)
        // setFormData(data);
        // setShowMessage(true);

        reset();
    };

   

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Controller name="name" control={control} rules={{ required: 'name is required.' }} render={({ field, fieldState }) => (
                                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>name*</label>
                                            </span>
                                            {getFormErrorMessage('name')}
                                        </div>
                                        <br/>
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
                                            <br/>
                                            <Button type="submit" label="Submit" className="mt-2" />
                                        </form>
    )
}
export default CreateProduct