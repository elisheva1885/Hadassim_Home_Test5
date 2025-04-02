import logo from './logo.svg';
import './App.css';
import SuppliersRegister from './Components/SuppliersRegister';
import ProductsContext from './Context/ProductsContext';
import { useState } from 'react';
function App() {

//   const getProducts = async () => {
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

const [products , setProducts] = useState([])
// const toggleProduct = () => {
//   setProducts
// }
  

  return (
    
    <div className="App">
      <ProductsContext.Provider value={{products, setProducts}}>
     <SuppliersRegister/>
     </ProductsContext.Provider>
    </div>
  );
}

export default App;
