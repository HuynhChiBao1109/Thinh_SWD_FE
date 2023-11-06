import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { setCloseForm, createNewEmployee, updateEmployee } from "../../redux/employee/employee.action";
import { getTime } from "../../utilities/time.Utility";
import './Employee.form.css'
import { ToastContainer, toast } from "react-toastify";

export const EmployeeForm = () => {
    const dispatch = useDispatch();
    // get data from store
    const isShowForm = useSelector(state => state.employee.isShowForm);
    const employeeUpdate = useSelector(state => state.employee.employeeUpdate);
    // init value form
    let initialValues;
    // check show update or create
    if (employeeUpdate !== null) {

        initialValues = {
            employeeId: employeeUpdate.employeeId,
            employeeName: employeeUpdate.employeeName,
            email: employeeUpdate.email,
            accPassword: employeeUpdate.accPassword,
            phone: employeeUpdate.phone,
            dateOfBirth: getTime(employeeUpdate.dateOfBirth),
            gender: employeeUpdate.gender
        }

    } else {
        initialValues = {
            employeeName: '',
            email: '',
            accPassword: '',
            phone: '',
            dateOfBirth: '',
            gender: 0
        }
    }
    // validate form
    const validationSchema = Yup.object().shape({
        employeeName: Yup.string().required('Name is required'),
        email: Yup.string().email().required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
        gender: Yup.number().min(0).max(1).required()
    });

    // handle close form 
    const handleClose = () => {
        dispatch(setCloseForm());
    }
    // onSubmit form
    const onSubmit = (values) => {
        if (employeeUpdate === null) {
            console.log(values);
            dispatch(createNewEmployee(values))
                .then(() => {
                    toast.success('Create employee success!');
                })
                .catch((error) => {
                    toast.error(`${error.message}`);
                })
        } else {
            dispatch(updateEmployee(values))
                .then(() => {
                    toast.success('Update employee success!');
                })
                .catch(() => {
                    toast.error('Update employee error!');
                })
        }
    }

    return (
        <div className="Employee_Form">
            <Modal show={isShowForm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>

                            <div className='user_update_form_group'>
                                <label htmlFor='employeeName'>Name</label>
                                <Field
                                    type='text'
                                    id='employeeName'
                                    name='employeeName'
                                />
                                <ErrorMessage name='employeeName' />
                            </div>

                            <div className='user_update_form_group'>
                                <label htmlFor='email'>Email</label>
                                <Field
                                    type='text'
                                    id='email'
                                    name='email'
                                />
                                <ErrorMessage name='email' />
                            </div>

                            <div className="user_update_form_group">
                                <label htmlFor="accPassword">Password</label>
                                <Field
                                    type="password"
                                    id="accPassword"
                                    name="accPassword"
                                />
                                <ErrorMessage name="accPassword" />
                            </div>

                            <div className='user_update_form_group'>
                                <label htmlFor='phone'>Phone</label>
                                <Field
                                    type='text'
                                    id='phone'
                                    name='phone'
                                />
                                <ErrorMessage name='phone' />
                            </div>

                            <div className='user_update_form_group'>
                                <label htmlFor='dateOfBirth'>Date of birth</label>
                                <Field
                                    type='date'
                                    id='dateOfBirth'
                                    name='dateOfBirth'
                                />
                                <ErrorMessage name='dateOfBirth' />
                            </div>

                            <div className='user_update_form_group'>
                                <label htmlFor="gender">Gender</label>
                                <Field as="select" name="gender">
                                    <option value="">Select an option</option>
                                    <option value="1">Men</option>
                                    <option value="0">Women</option>
                                </Field>

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