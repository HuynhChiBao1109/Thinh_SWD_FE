import React, { useEffect } from "react";
import './Store.form.css';
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { setCloseFormCreate } from "../../redux/store/store.action";
import { decodeToken } from "../../utilities/jwt.Utility";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";
import { createNewStore, updateStore } from "../../redux/store/store.action";
import { ToastContainer, toast } from "react-toastify";

export const StoreForm = () => {
    const dispatch = useDispatch();
    // get data from store
    const isShowForm = useSelector((state) => state.store.isShowForm);
    const storeUpdate = useSelector((state) => state.store.storeUpdate);
    // get data from cookie
    const token = getTokenFromCookie();
    const decode = decodeToken(token);
    // init value form
    let initialValues;
    // check show update or create
    if (storeUpdate !== null) {
        initialValues = {
            storeId: storeUpdate.storeId,
            storeName: storeUpdate.storeName,
            storeAddress: storeUpdate.storeAddress,
            adminName: storeUpdate.adminName,
        }
    } else {
        initialValues = {
            storeName: '',
            storeAddress: ''
        }
    }
    // validate form
    const validationSchema = Yup.object().shape({
        storeName: Yup.string().required('storeName is required'),
        storeAddress: Yup.string().required('storeAddress is required')
    });

    // handle close form 
    const handleClose = () => {
        dispatch(setCloseFormCreate());
    }
    // onSubmit form
    const onSubmit = (values) => {
        if (storeUpdate !== null) {
            console.log(values);
            const data = {
                storeId: values.storeId,
                adminId: decode.id,
                storeName: values.storeName,
                storeAddress: values.storeAddress,
            }
            dispatch(updateStore(data))
                .then(() => {
                    toast.success('Update store success!');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        } else {
            const data = {
                adminId: decode.id,
                storeName: values.storeName,
                storeAddress: values.storeAddress,
            }
            dispatch(createNewStore(data))
                .then(() => {
                    toast.success('Create new store success!');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        }
    }

    return (
        <div className="Store_Form">
            <Modal show={isShowForm} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Store Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>

                            <div className="form-group">
                                <label htmlFor="storeName">Name</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="storeName"
                                    name="storeName"
                                />
                                <ErrorMessage name="storeName" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="storeAddress">Address</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="storeAddress"
                                    name="storeAddress"
                                />
                                <ErrorMessage name="storeAddress" component="div" className="invalid-feedback" />
                            </div>
                            <br />
                            <button
                                type="submit"
                                className='user_update_button_submit'
                            >
                                Save
                            </button>

                        </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    )
}