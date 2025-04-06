import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';

const AdminCreateOrders = () => {
    const location = useLocation();
    const [supplierProducts, setSupplierProducts] = useState([]);
    const [amount, setAmount] = useState(0);    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState([]);
    const { supplier } = location.state || {};
    const {token} = useSelector((state) => state.token);

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
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const data = {
                    supplier: supplier._id, 
                    products: [{product: product._id ,amount: amount }]
                }
                console.log(data);
                const res = await axios.post("http://localhost:8000/api/orders" ,data , {headers})
                if(res.status===201){
                    alert("sucess")
                }
            }
        }
        catch (error) {
            if(error.status === 401){
                alert('Unauthorized')
            }
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


    const addProduct = () => {
        if (selectedProduct && amount > 0) {
            setProductList(prev => [
                ...prev,
                {
                    product: selectedProduct,
                    amount: amount
                }
            ]);
            setSelectedProduct(null);
            setAmount(null);
            setSupplierProducts(supplierProducts=> supplierProducts.filter(product=> product._id != selectedProduct._id))
        }
    };

    // const onSubmit = () => {
    //     console.log("Products to submit:", productList);
    //     // כאן את יכולה לשלוח לשרת או לכל פעולה שתרצי
    // };
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
            {/* <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                <div className="field">
                    <span className="p-float-label">
                        <Controller name="product" control={control} render={({ field }) => (
                            <Dropdown id={field.name} value={field._id} onChange={(e) => field.onChange(e.value)} options={supplierProducts ? supplierProducts : []} optionLabel="name" />
                        )} />
                        <label htmlFor="product">Products</label>
                    </span>
                </div>
                <br /> */}
                {/* <Button onClick={() => setAmount()} label="amounts" /> */}
                {/* <div> */}
                    {/* {selectedItems?.map((s, index) => {
                    console.log(s);
                    return (
                        <div key={index}>
                            <h1>{s}</h1>
                            <InputNumber value={value} onValueChange={handleValueChange} showButtons />
                        </div>
                    );
                })} */}
                    {/* <InputNumber value={amount} onValueChange={handleValueChange} showButtons />
                    <Button type="submit" label="Submit" className="mt-2" />

                </div>
            </form> */}


            {/* <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                <label htmlFor="input-rowclick">Row Click</label>
            </div>
            <DataTable value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div> */}



        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <span className="p-float-label">
                    <Dropdown
                        id="product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.value)}
                        options={supplierProducts || []}
                        optionLabel="name"
                        placeholder="בחר מוצר"
                    />
                    <label htmlFor="product">Product</label>
                </span>
            </div>

            <div className="field mt-3">
                <label htmlFor="amount">Amount</label>
                <InputNumber
                    id="amount"
                    value={amount}
                    onValueChange={(e) => setAmount(e.value)}
                    showButtons
                    min={1}
                />
            </div>

            <Button type="button" label="Add To List" className="mt-2" onClick={addProduct} />

            {/* הצגת רשימת המוצרים שנבחרו */}
            <div className="mt-4">
                <h4>מוצרים שנבחרו:</h4>
                {productList.map((item, index) => (
                    <div key={index} className="mb-2">
                        {item.product.name} - amount: {item.amount}
                    </div>
                ))}
            </div>

            <Button type="submit" label="Create Order" className="mt-4" disabled={productList.length === 0}/>
        </form>
        </>
    )
}

export default AdminCreateOrders