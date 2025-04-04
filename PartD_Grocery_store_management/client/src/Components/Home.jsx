import { Link, Route, Router, Routes } from "react-router"
import { Button } from "primereact/button"
import { Suspense, lazy } from "react"

const SuppliersRegister = lazy(() => import('./SuppliersRegister'));
const SuppliersLogin = lazy(() => import('./SuppliersLogin'));
const SupplierOrders = lazy(() => import('./SupplierOrders'));
const AdminLogin = lazy(() => import('./AdminLogin'));
const AdminHome = lazy(() => import('./AdminHome'));

const Home = () => {
   

return(
<>
    <Link to={'/suppliersRegister'}>to Register</Link>
    <Link to={'/suppliersLogin'}>to Login</Link>
    <Link to={'/adminLogin'}>Admin</Link>
    <Link to={'/admin/home'}>Admin</Link>

    <Routes>
    <Route path='/suppliersRegister' element={<Suspense fallback="Loading..."><SuppliersRegister /></Suspense>}></Route>
    <Route path='/suppliersLogin' element={<Suspense fallback="Loading..."><SuppliersLogin /></Suspense>}></Route>
    <Route path='/supplier/orders' element={<Suspense fallback="Loading..."><SupplierOrders /></Suspense>}></Route>
    <Route path='/adminLogin' element={<Suspense fallback="Loading..."><AdminLogin /></Suspense>}></Route>
    <Route path='/admin/home' element={<Suspense fallback="Loading..."><AdminHome /></Suspense>}></Route>

    </Routes>
    </>
    )
}

export default Home