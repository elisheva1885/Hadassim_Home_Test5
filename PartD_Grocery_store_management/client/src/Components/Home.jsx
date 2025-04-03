import { Link, Route, Router, Routes } from "react-router"
import { Button } from "primereact/button"
import { Suspense, lazy } from "react"

const SuppliersRegister = lazy(() => import('./SuppliersRegister'));
const SuppliersLogin = lazy(() => import('./SuppliersLogin'));
const SupplierOrders = lazy(() => import('./SupplierOrders'));

const Home = () => {
   

return(
<>
    <Link to={'/suppliersRegister'}>to Register</Link>
    <Link to={'/suppliersLogin'}>to Login</Link>
    <Routes>
    <Route path='/suppliersRegister' element={<Suspense fallback="Loading..."><SuppliersRegister /></Suspense>}></Route>
    <Route path='/suppliersLogin' element={<Suspense fallback="Loading..."><SuppliersLogin /></Suspense>}></Route>
    <Route path='/supplier/orders' element={<Suspense fallback="Loading..."><SupplierOrders /></Suspense>}></Route>

    </Routes>
    </>
    )
}

export default Home