import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.form.css';
import { login, loginByGoogle } from '../../redux/authen/authen.action';
import { ToastContainer, toast } from 'react-toastify'

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        Password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        Password: Yup.string().required('Password is required').min(4),
    });

    const onSubmit = (values, { resetForm }) => {
        dispatch(login(values))
            .then((token) => {
                toast.success('Login success');
                navigate('/');

            })
            .catch((error) => {
                toast.error(error.message);
            })
    };

    const handleLoginGoogle = () => {
        dispatch(loginByGoogle())
            .then((token) => {
                toast.success('Login success');
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }


    return (
        <div className='login_form'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className='form_group'>
                        <Field
                            type="mail"
                            name="email"
                            className='form_control'
                            placeholder="Enter your email"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <div className='form_group'>
                        <Field
                            type="password"
                            name="Password"
                            className='form_control'
                            placeholder="Enter your password"
                        />
                        <ErrorMessage
                            name="Password"
                            component="div"
                            className="text-danger"
                        />
                    </div>

                    <button
                        type="submit"
                        className='button_login'
                    >
                        Login
                    </button>

                    <img
                        src="/assets/image/google.png"
                        alt="google"
                        style={
                            {
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                            }
                        }
                        className="google_icon"
                        onClick={handleLoginGoogle}
                    />
                </Form>
            </Formik>
            <ToastContainer />
        </div>
    );
};