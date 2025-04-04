import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router";

const AdminCreateOrders = () => {
    const location = useLocation();
    const [supplierProducts, setSupplierProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);
    const [amount, setAmount] = useState(0);
    const [value, setValue] = useState(0);
    const { supplier } = location.state || {};

    const getProducts = async () => {
        // const { supplier } = location.state || {}; // Access the type from state
        // try{
        //     supplier.productsList.map(prod=>
        //     {
        //         const res = await axios.get(`http://localhost:8000/api/products/${prod}`)
        //     if (res.status === 200) {
        //         setsupplierProducts([...supplierProducts, res.data])
        //         console.log("SuppliersRegister", res.data);
        //     })
        console.log("inside funcion", supplier);
        try {
            const productRequests = supplier.productsList.map((prod) =>
                axios.get(`http://localhost:8000/api/products/${prod}`)
            );

            const responses = await Promise.all(productRequests);

            const newProducts = responses
                .filter(res => res.status === 200)
                .map(res => res.data);

            // setSupplierProducts((newProducts)?.map((product) => ({ label: product.name, value: product._id }))); // Update the state with the products
            console.log(newProducts);
            setSupplierProducts(newProducts);
            console.log("sup",supplierProducts);

        }

        catch (error) {
            console.error(error)
        }
    }
    const createOrder = async (product) => {
        try {
            if (product.minimum_quantity > amount) {
                alert(`you have to take a bigger amount, the minimum is ${product.minimum_quantity}`)
            }
            else {
                const data = {
                    supplier: supplier._id, 
                    products: [{product: product._id ,amount: amount }]
                }
                console.log(data);
                const res = await axios.post("http://localhost:8000/api/orders",data )
                if(res.status===201){
                    alert("sucess")
                }
            }
        }
        catch (error) {

        }
    }

    const onSubmit = (data) => {
        console.log(data);
        // createSupplier(data)
        createOrder(data.product)
        // reset();
    };

    const handleValueChange = (e) => {
        setAmount(e.value);
        // setValue(e.value); // This updates the state with the new value

        // createOrder()
    };

    const defaultValues = {
        product: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });



    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <br />  <br />  <br />  <br />
            {/* <MultiSelect
                value={selectedItems}
                options={supplierProducts }
                onChange={(e) => {
                    setSelectedItems(e.value);
                    setSelectAll(e.value.length === supplierProducts.length);
                    
                }}
                selectAll={selectAll}
                onSelectAll={(e) => {
                    setSelectedItems(e.checked ? [] : supplierProducts?.map((supplierProducts) => supplierProducts.value));
                    setSelectAll(!e.checked);
                }}
                virtualScrollerOptions={{ itemSize: 43 }}
                maxSelectedLabels={3}
                placeholder="Select Items"
                className="w-full md:w-20rem"
            /> */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                <div className="field">
                    <span className="p-float-label">
                        <Controller name="product" control={control} render={({ field }) => (
                            <Dropdown id={field.name} value={field._id} onChange={(e) => field.onChange(e.value)} options={supplierProducts ? supplierProducts : []} optionLabel="name" />
                        )} />
                        <label htmlFor="product">Products</label>
                    </span>
                </div>
                <br />
                {/* <Button onClick={() => setAmount()} label="amounts" /> */}
                <div>
                    {/* {selectedItems?.map((s, index) => {
                    console.log(s);
                    return (
                        <div key={index}>
                            <h1>{s}</h1>
                            <InputNumber value={value} onValueChange={handleValueChange} showButtons />
                        </div>
                    );
                })} */}
                    <InputNumber value={amount} onValueChange={handleValueChange} showButtons />
                    <Button type="submit" label="Submit" className="mt-2" />

                </div>
            </form>
        </>
    )
}

export default AdminCreateOrders