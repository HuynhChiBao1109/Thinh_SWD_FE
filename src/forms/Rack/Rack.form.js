import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import './Rack.form.css'
import { ToastContainer, toast } from "react-toastify";
import { setCloseForm, updateRack, createRack } from "../../redux/rack/rack.action";

export const RackForm = () => {
    const dispatch = useDispatch();
    // get data from store
    const isShowForm = useSelector(state => state.rack.isShowForm);
    const rackUpdate = useSelector(state => state.rack.rackUpdate);
    // init value form
    let initialValues;
    // check show update or create
    if (rackUpdate === null) {
        initialValues = {
            shelfId: 0,
            totalCell: 0
        }
    } else {
        initialValues = {
            rackId: rackUpdate.rackId,
            shelfId: rackUpdate.shelfId,
            totalCell: rackUpdate.totalCell
        }
    }
    // validate form
    const validationSchema = Yup.object().shape({
        shelfId: Yup.number().required('Shelf Id is required').positive().integer(),
        totalCell: Yup.number().required('Total Cell is required').positive().integer(),
    });

    // handle close form 
    const handleClose = () => {
        dispatch(setCloseForm());
    }
    // onSubmit form
    const onSubmit = (values) => {
        if (rackUpdate === null) {
            dispatch(createRack(values))
                .then(() => {
                    toast.success("Create Rack Success!");

                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            dispatch(updateRack(values))
                .then(() => {
                    toast.success("Update Rack Success!");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        }
    }

    return (
        <div className="Rack_Form">
            <Modal show={isShowForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rack Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>

                            <div className="form-group">
                                <label htmlFor="shelfId">Shelf Id</label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="shelfId"
                                    name="shelfId"
                                />
                                <ErrorMessage name="shelfId" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="totalCell">Total Cell</label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="totalCell"
                                    name="totalCell"
                                />
                                <ErrorMessage name="totalCell" />
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