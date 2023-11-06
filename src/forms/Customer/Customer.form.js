import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";
import { getTime } from "../../utilities/time.Utility";
import { setCloseForm, createCustomer, updateCustomer } from "../../redux/customer/customer.action";
import { ToastContainer, toast } from "react-toastify";
import './Customer.form.css'

export const CustomerForm = () => {
    const dispatch = useDispatch();
    // init state
    // const [isShowPass, setIsShowPass] = useState(false);
    // get data from store
    const isShowForm = useSelector(state => state.customer.isShowForm);
    const customerUpdate = useSelector(state => state.customer.customerUpdate);
    // init value form
    let initialValues;
    // check show update or create
    if (customerUpdate !== null) {

        initialValues = {
            customerId: customerUpdate.customerId,
            customerName: customerUpdate.customerName,
            email: customerUpdate.email,
            accPassword: customerUpdate.accPassword,
            phone: customerUpdate.phone,
            dateOfBirth: getTime(customerUpdate.dateOfBirth),
            gender: customerUpdate.gender,
        }

    } else {
        initialValues = {
            customerName: '',
            email: '',
            accPassword: '',
            phone: '',
            dateOfBirth: '',
            gender: 0
        }
    }
    // validate form
    const validationSchema = Yup.object().shape({
        customerName: Yup.string().required('Name is required'),
        email: Yup.string().email().required('Email is required'),
        accPassword: Yup.string().required('Password is required'),
        phone: Yup.string().required('Phone is required'),
        dateOfBirth: Yup.string().required('Date of birth is required'),
        gender: Yup.number().min(0).max(1)
    });

    // handle close form 
    const handleClose = () => {
        dispatch(setCloseForm());
    }
    // onSubmit formvalues
    const onSubmit = (values) => {
        if (customerUpdate === null) {
            dispatch(createCustomer(values))
                .then(() => {
                    toast.success('Create customer success!');
                })
                .catch(() => {
                    toast.error('Create customer fail!');
                })
        } else {
            dispatch(updateCustomer(values))
                .then(() => {
                    toast.success('Update customer success!');
                })
                .catch(() => {
                    toast.error('Update customer fail!');
                })
        }
    }

    return (
        <div className="Store_Form">
            <Modal show={isShowForm} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>

                            <div className='user_update_form_group'>
                                <label htmlFor='customerName'>Name</label>
                                <Field
                                    type='text'
                                    id='customerName'
                                    name='customerName'
                                />
                                <ErrorMessage name='customerName' />
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

                            <div className='user_update_form_group'>
                                <label htmlFor='accPassword'>Password</label>
                                <Field
                                    type='text'
                                    id='accPassword'
                                    name='accPassword'
                                />
                                <ErrorMessage name='accPassword' />
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