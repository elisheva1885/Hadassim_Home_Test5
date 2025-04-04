import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setCompanies } from "../Store/Slices/companiesSlice";

const AdminHome = () => {
    const {companies} = useSelector(state=> state.companies)
    console.log(companies);
    const dispatch = useDispatch()
    const getCompanies = async (req,res)=> {
        try {
            const res = await axios.get("http://localhost:8000/api/suppliers/companies")
            if (res.status === 200) {
                dispatch(setCompanies(res.data))
                console.log(companies);
            }
        }
        catch (error) {
            if (error.status === 404) {
                alert("not found")
            }
            else if (error.status === 400) {
                alert("all details reqired")
            }
        }
    }
    useEffect(() => {
        getCompanies()
    }, []);
return(
    <>
    </>
)
}
export default AdminHome