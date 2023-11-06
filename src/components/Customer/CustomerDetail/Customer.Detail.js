import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTime } from '../../../utilities/time.Utility';
import { setCloseDetail, setShowFormUpdate } from "../../../redux/customer/customer.action";
import { Offcanvas } from "react-bootstrap";
import { deleteCustomer } from "../../../redux/customer/customer.action";
import { ToastContainer, toast } from "react-toastify";
import './Customer.Detail.css'

export const CustomerDetail = () => {
    // local variable
    const dispatch = useDispatch();
    // get data from store
    const isShow = useSelector(state => state.customer.isShowDetail);
    const customer = useSelector(state => state.customer.customerDetail);
    // check customer 
    if (customer === null) return null;
    // handle close detail
    const handleOffcanvas = () => {
        dispatch(setCloseDetail());
    }
    // handle delete customer
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            dispatch(deleteCustomer(id))
                .then(() => {
                    toast.success('Delete customer success!');
                })
                .catch((error) => {
                    toast.error(error.message);
                })
        } else {
            return;
        }
    }

    // handle show update
    const handleShowUpdate = (item) => {
        dispatch(setShowFormUpdate(item));
    }

    return (
        <Offcanvas show={isShow} onHide={handleOffcanvas} placement="end" className="customer_Detail">

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Customer Detail</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="customer_item">
                <div className="customer_detail_item customer_item_customerId">
                    <label>Id</label>
                    <span>{customer.customerId}</span>
                </div>

                <div className="customer_detail_item customer_item_customerName">
                    <label>Name</label>
                    <span>{customer.customerName}</span>
                </div>

                <div className="customer_detail_item customer_item_email">
                    <label>Email</label>
                    <span>{customer.email}</span>
                </div>

                <div className="customer_detail_item customer_item_accPassword">
                    <label>Password</label>
                    <span>{customer.accPassword}</span>
                </div>

                <div className="customer_detail_item customer_item_phone">
                    <label>Phone</label>
                    <span>{customer.phone}</span>
                </div>

                <div className="customer_detail_item customer_item_dateOfBirth">
                    <label>Date Of Birth</label>
                    <span>{getTime(customer.dateOfBirth)}</span>
                </div>

                <div className="customer_detail_item customer_item_gender">
                    <label>Gender</label>
                    <span>{customer.gender}</span>
                </div>

                <div className="customer_detail_item customer_item_role">
                    <label>Role</label>
                    <span>{customer.role}</span>
                </div>
                <br />
                <div >
                    <button className="btn btn-primary" onClick={() => handleShowUpdate(customer)}>Update</button>

                    <button className="btn btn-danger customer_button_delete" onClick={() => handleDelete(customer.customerId)}>Delete</button>
                </div>

            </Offcanvas.Body>
            <ToastContainer />
        </Offcanvas>
    )
}