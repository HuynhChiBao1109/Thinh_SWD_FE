import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authen/authen.action";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout())
            .then(() => {
                toast.success('Logout success');
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }, [])

    return (
        <div className="Logout_Page">
            <h1>Logout</h1>
            <ToastContainer />
        </div>
    )
}

export default LogoutPage;