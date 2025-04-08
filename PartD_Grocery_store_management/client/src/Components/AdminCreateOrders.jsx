import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";


const AdminCreateOrders = () => {
    const location = useLocation();
    const [supplierProducts, setSupplierProducts] = useState([]);
    const [amount, setAmount] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState([]);
    const { supplier } = location.state || {};
    const { token } = useSelector((state) => state.token);
    const navigate  = useNavigate()
    const getProducts = async () => {
        try {
            const productRequests = supplier.productsList.map((prod) =>
                axios.get(`http://localhost:8000/api/products/${prod}`)
            );
            const responses = await Promise.all(productRequests);
            const newProducts = responses
                .filter(res => res.status === 200)
                .map(res => res.data);
            console.log(newProducts);
            setSupplierProducts(newProducts);
            console.log("sup", supplierProducts);
        }
        catch (error) {
            console.error(error)
        }
    }

    const createOrder = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };
                const data = {
                    supplier: supplier._id,
                    products: productList.map(item => ({
                        product: item.product._id,
                        amount: item.amount
                    }))
                };
            const res = await axios.post("http://localhost:8000/api/orders", data, { headers })
            if (res.status === 201) {
                alert("orderCreated")
                navigate("/admin/navigate")
            }
        }
        catch (error) {
            if (error.status === 401) {
                alert('Unauthorized')
            }
        }
    }

    const onSubmit = (data) => {
        createOrder()
    };

    // const handleValueChange = (e) => {
    //     setAmount(e.value);
  
    // };

    const defaultValues = {
        product: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addProduct = () => {
        if (selectedProduct.minimum_quantity > amount) {
            alert(`you have to take a bigger amount, the minimum is ${selectedProduct.minimum_quantity}`)
        }
        else {
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
                setSupplierProducts(supplierProducts => supplierProducts.filter(product => product._id != selectedProduct._id))
                console.log(productList);
            }
        }
    };

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <>
            <div style={{ paddingTop: '60px' }}>
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
                <div className="mt-4">
                    <h4>מוצרים שנבחרו:</h4>
                    {productList.map((item, index) => (
                        <div key={index} className="mb-2">
                            {item.product.name} - amount: {item.amount}
                        </div>
                    ))}
                </div>
                <Button type="submit" label="Create Order" className="mt-4" disabled={productList.length === 0} />
            </form>
            </div>
        </>
    )
}

export default AdminCreateOrders