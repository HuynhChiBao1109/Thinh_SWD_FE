import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import './Cell.form.css'
import { ToastContainer, toast } from "react-toastify";
import { setCloseForm, createCell, updateCell } from "../../redux/cell/cell.action";

export const CellForm = () => {
    const dispatch = useDispatch();
    // get data from store
    const isShowForm = useSelector(state => state.cell.isShowForm);
    const cellUpdate = useSelector(state => state.cell.cellUpdate);
    // init value form
    let initialValues;
    // check show update or create
    if (cellUpdate === null) {
        initialValues = {
            rackId: 0,
        }
    } else {
        initialValues = {
            cellId: cellUpdate.cellId,
            rackId: cellUpdate.rackId,
        }
    }
    // validate form
    const validationSchema = Yup.object().shape({
        rackId: Yup.number().required('Rack Id is required').positive('Rack Id must be positive number')
    });

    // handle close form 
    const handleClose = () => {
        dispatch(setCloseForm());
    }
    // onSubmit form
    const onSubmit = (values) => {
        if (cellUpdate === null) {
            dispatch(createCell(values))
                .then(() => {
                    toast.success('Create cell success!');

                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        } else {
            const data = {
                cellId: cellUpdate.cellId,
                rackId: values.rackId,
            }
            dispatch(updateCell(data))
                .then(() => {
                    toast.success('Update cell success!');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        }
    }

    return (
        <div className="Cell_form">
            <Modal show={isShowForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cell Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="form-group">
                                <label htmlFor="rackId">Rack Id</label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="rackId"
                                    name="rackId"
                                    placeholder="Enter rack id"
                                />
                                <ErrorMessage name="rackId" />
                            </div>

                            <br />

                            <button
                                type="submit"
                                className='user_update_button_submit btn btn-primary'
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