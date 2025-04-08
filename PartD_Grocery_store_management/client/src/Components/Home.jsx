import { Link, Route, Router, Routes } from "react-router"
import {} from "primereact/button"
import {  lazy, useEffect } from "react"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Store/Slices/productsSlice";

const SuppliersRegister = lazy(() => import('./SuppliersRegister'));
const SuppliersLogin = lazy(() => import('./SuppliersLogin'));
const SupplierOrders = lazy(() => import('./SupplierOrders'));
const AdminLogin = lazy(() => import('./AdminLogin'));
const AdminHome = lazy(() => import('./AdminHome'));
const AdminCreateOrders = lazy(() => import('./AdminCreateOrders'));

const Home = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state=> state.products)

    const getProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/products')
            if (res.status === 200) {
                dispatch(setProducts((res.data).map((product) => ({ label: product.name, value: product._id , price: product.price }))))
                console.log(res.data);
            }
        }
        catch (error) {
            if (error.status === 404)
                alert("no products you welcome to add")
        }
    }


    useEffect(() => {
        getProducts()
    }, []);
return(
<>
    {/* <Link to={'/suppliersRegister'}>to Register</Link>
    <Link to={'/suppliersLogin'}>to Login</Link>
    <Link to={'/adminLogin'}>Admin</Link>
    {/* <Link to={'/admin/home'}>Admin</Link> */}

    {/* <Routes>
    <Route path='/suppliersRegister' element={<Suspense fallback="Loading..."><SuppliersRegister /></Suspense>}></Route>
    <Route path='/suppliersLogin' element={<Suspense fallback="Loading..."><SuppliersLogin /></Suspense>}></Route>
    <Route path='/supplier/orders' element={<Suspense fallback="Loading..."><SupplierOrders /></Suspense>}></Route>
    <Route path='/adminLogin' element={<Suspense fallback="Loading..."><AdminLogin /></Suspense>}></Route>
    <Route path='/admin/home' element={<Suspense fallback="Loading..."><AdminHome /></Suspense>}></Route>
    <Route path='/admin/order' element={<Suspense fallback="Loading..."><AdminCreateOrders /></Suspense>}></Route>

    </Routes>  */}
    </>
    )
}

export default Home