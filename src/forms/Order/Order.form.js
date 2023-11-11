import { Modal } from "bootstrap";
import React from "react";

export const OrderFrom = () => {
    return (
        <div className="Order_form">
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