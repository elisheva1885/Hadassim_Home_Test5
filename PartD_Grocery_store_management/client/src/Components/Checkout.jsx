
import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setStoreProducts } from "../Store/Slices/storeProductsSlice";

const Checkout = () => {
    const [amount, setAmount] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState([]);
    const { storeProducts } = useSelector((state) => state.storeProducts);
    const dispatch = useDispatch();


    const purchase = async () => {
        try {
            const data = productList.map((item) => {
                const productKey = item.product.name;
                return [productKey, item.amount];
            });

            const object = {};
            data.forEach(([key, value]) => {
                object[key] = value;
            });
            const res = await axios.put("http://localhost:8000/api/storeProducts", object);
            if (res.status === 201) {
                alert("purchase succeeded created!");
            }
        } 
        catch (error) {
            alert(error.response.data.message)
        }
    };

    const onSubmit = () => {
        purchase();
    };

    const { handleSubmit } = useForm();

    const addProduct = () => {
        if (!selectedProduct) {
            alert("Please select a product");
            return;
        }

        if (productList.find(item => item.product._id === selectedProduct._id)) {
            alert("Product already added");
            return;
        }

        setProductList(prev => [
            ...prev,
            {
                product: selectedProduct,
                amount: amount
            }
        ]);
        setSelectedProduct(null);
        setAmount(null);
    };

    const getStoreProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/storeProducts')
            if (res.status === 200) {
                dispatch(setStoreProducts((res.data).map((product) => ({ name: product.name, _id: product._id, minimum_quantity: product.minimum_quantity, current_quantity: product.current_quantity }))))
            }
        }
        catch (error) {
            if (error.status === 404)
                alert("no products in the store")
        }
    }


    useEffect(() => {
        getStoreProducts()
    }, []);
    return (
        <div style={{ paddingTop: '60px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <span className="p-float-label">
                        <Dropdown
                            id="_id"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.value)}
                            options={storeProducts || []}
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
                <Button type="submit" label="Purchase" className="mt-4" disabled={productList.length === 0} />
            </form>
        </div>
    );
};

export default Checkout;


