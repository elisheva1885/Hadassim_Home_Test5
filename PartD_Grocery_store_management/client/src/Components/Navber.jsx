import { Menubar } from 'primereact/menubar';
import { Route, Routes, useNavigate } from "react-router"
import { Suspense, lazy, useEffect } from "react"
import { setProducts } from '../Store/Slices/productsSlice';
import axios from 'axios';
import { useDispatch} from "react-redux";
const SuppliersRegister = lazy(() => import('./SuppliersRegister'));
const SuppliersLogin = lazy(() => import('./SuppliersLogin'));
const SupplierOrders = lazy(() => import('./SupplierOrders'));
const AdminLogin = lazy(() => import('./AdminLogin'));
const AdminHome = lazy(() => import('./AdminHome'));
const AdminCreateOrders = lazy(() => import('./AdminCreateOrders'));
const Home = lazy(() => import('./Home'));
const AdminOrders = lazy(() => import('./AdminOrders'));
const AdminNavigate = lazy(() => import('./AdminNavigate'));
const AdminExistsOrders = lazy(() => import('./AdminExistsOrders'));

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/products')
            if (res.status === 200) {
                dispatch(setProducts((res.data).map((product) => ({ label: product.name, value: product._id, price: product.price }))))
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

    const items = [
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            command: () => navigate('/suppliersRegister')
        },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            command: () => navigate('/suppliersLogin')
        },
        {
            label: 'Admin login',
            icon: 'pi pi-star',
            command: () => navigate('/adminLogin')
        }
    ];

    return (
        <>
            <Routes>
                <Route path='/' element={<Suspense fallback="Loading..."><Home /></Suspense>}></Route>
                <Route path='/suppliersRegister' element={<Suspense fallback="Loading..."><SuppliersRegister /></Suspense>}></Route>
                <Route path='/suppliersLogin' element={<Suspense fallback="Loading..."><SuppliersLogin /></Suspense>}></Route>
                <Route path='/supplier/orders' element={<Suspense fallback="Loading..."><SupplierOrders /></Suspense>}></Route>
                <Route path='/adminLogin' element={<Suspense fallback="Loading..."><AdminLogin /></Suspense>}></Route>
                <Route path='/admin/home' element={<Suspense fallback="Loading..."><AdminHome /></Suspense>}></Route>
                <Route path='/admin/createOrder' element={<Suspense fallback="Loading..."><AdminCreateOrders /></Suspense>}></Route>
                <Route path='/admin/view/orders' element={<Suspense fallback="Loading..."><AdminOrders /></Suspense>}></Route>
                <Route path='/admin/view/existingOrders' element={<Suspense fallback="Loading..."><AdminExistsOrders /></Suspense>}></Route>
                <Route path='/admin/navigate' element={<Suspense fallback="Loading..."><AdminNavigate /></Suspense>}></Route>
            </Routes>

            <div className="card">
                <Menubar model={items} style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    backgroundColor: '#f5e1a4',
                    color: 'black',
                    padding: '10px',
                    zIndex: '1000'
                }} />
            </div>
        </>
    )
}
export default Navbar