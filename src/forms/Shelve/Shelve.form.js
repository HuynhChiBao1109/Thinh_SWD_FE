import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { setCloseForm } from "../../redux/shelve/shelve.action";
import './Shelve.form.css';
import { ToastContainer, toast } from "react-toastify";

export const ShelveForm = () => {
    const dispatch = useDispatch();
    // get data from store
    const isShowForm = useSelector((state) => state.shelve.isShowForm);
    const shelve = useSelector((state) => state.shelve.shelveUpdate);
    // init value form
    let initialValues;
    if (shelve === null) {
        initialValues = {
            areaId: 0,
            boxId: '',
            totalRack: 0
        }
    } else {
        initialValues = {
            shelfId: shelve.shelfId,
            areaId: shelve.areaId,
            boxId: shelve.boxId,
            totalRack: shelve.totalRack
        }
    }
    // validate form
    const validationSchema = Yup.object({
        areaId: Yup.number().required('Required').positive().integer(),
        boxId: Yup.string().required('Required'),
        totalRack: Yup.number().required('Required').positive().integer(),
    })
    // handle close form 
    const handleClose = () => {
        dispatch(setCloseForm());
    }
    // onSubmit form
    const onSubmit = (values) => {
        if (shelve === null) {
            toast.success('Create Shelve Success!');
        }
    }
    return (
        <div className="Shelve_Form">
            <Modal show={isShowForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shelve Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="form_group">
                                <label htmlFor="areaId">Area ID</label>
                                <Field
                                    type="number"
                                    name="areaId"
                                    id="areaId"
                                    className="form_control"
                                >
                                </Field>
                                <ErrorMessage name="areaId" />
                            </div>

                            <div className="form_group">
                                <label htmlFor="boxId">Box</label>
                                <Field
                                    type="text"
                                    name="boxId"
                                    id="boxId"
                                    className="form_control"
                                >
                                </Field>
                                <ErrorMessage name="boxId" />
                            </div>

                            <div className="form_group">
                                <label htmlFor="totalRack">Total Rack</label>
                                <Field
                                    type="number"
                                    name="totalRack"
                                    id="totalRack"
                                    className="form_control"
                                />
                                <ErrorMessage name="totalRack" />
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