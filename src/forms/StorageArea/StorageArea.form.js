import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { setCloseForm, createStorageArea, updateStorageArea } from "../../redux/storageArea/storageArea.action";
import { getListCategory } from '../../redux/category/category.aciton'
import { getListStore } from '../../redux/store/store.action'
import './StorageArea.form.css'
import { ToastContainer, toast } from "react-toastify";
import './StorageArea.form.css'

export const StorageAreaForm = () => {
    const dispatch = useDispatch();
    // get data from store
    const isShowForm = useSelector((state) => state.storageArea.isShowForm);
    const storageAreaUpdate = useSelector((state) => state.storageArea.storageAreaUpdate);
    const listCategory = useSelector((state) => state.category.listCategory);
    const listStore = useSelector((state) => state.store.listStore);
    // check list category
    useEffect(() => {
        if (listCategory === null) {
            dispatch(getListCategory());
        }
        if (listStore === null) {
            dispatch(getListStore('', '', '', 1, 20));
        }
    }, [])
    // init value form
    let initialValues;

    if (storageAreaUpdate === null) {
        initialValues = {
            storeId: '',
            categoryId: '',
            totalShelf: 0,
        }
    } else {
        // find category id base categoryName
        const category = listCategory.find((category) => category.categoryName === storageAreaUpdate.categoryName);
        // find store id base storeName
        const store = listStore.find((store) => store.storeName === storageAreaUpdate.storeName);
        initialValues = {
            areaId: storageAreaUpdate.areaId,
            storeId: store.storeId,
            categoryId: category.categoryId,
            totalShelf: storageAreaUpdate.totalShelf,
        }
    }
    // validate form
    const validationSchema = Yup.object().shape({
        storeId: Yup.number().required('Required'),
        categoryId: Yup.string().required('Required'),
        totalShelf: Yup.number().required('Required').positive().integer(),
    });

    // handle close form
    const handleClose = () => {
        dispatch(setCloseForm());
    }
    // handle submit form
    const onSubmit = (values) => {
        console.log(values);
        if (storageAreaUpdate === null) {
            // create
            dispatch(createStorageArea(values))
                .then(() => {
                    toast.success("Create StorageArea Success!");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })

        } else {
            // update
            dispatch(updateStorageArea(values))
                .then(() => {
                    toast.success("Update StorageArea Success!");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        }
    }
    return (
        <div className="StorageArea_Form">
            <Modal
                show={isShowForm}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>StorageArea Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>

                            <div className="form-group">
                                <label htmlFor="storeId">Store</label>
                                <Field
                                    name="storeId"
                                    id="storeId"
                                    className="form-control"
                                    as="select" >
                                    <option value="">Select Store</option>
                                    {listStore && listStore.map((store, index) => (
                                        <option key={index} value={store.storeId}>{store.storeName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="storeId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="categoryId">Category</label>
                                <Field
                                    name="categoryId"
                                    id="categoryId"
                                    className="form-control"
                                    as="select" >
                                    <option value="">Select Category</option>
                                    {listCategory && listCategory.map((category, index) => (
                                        <option key={index} value={category.categoryId}>{category.categoryName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="totalShelf">Total Shelf</label>
                                <Field
                                    type="number"
                                    name="totalShelf"
                                    id="totalShelf"
                                    className="form-control"
                                    placeholder="Enter totalShelf"
                                />
                                <ErrorMessage name="totalShelf" />
                            </div>

                            <button
                                type="submit"
                                className='form-group btn btn-primary'
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