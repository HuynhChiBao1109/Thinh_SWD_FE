import React from "react";
import './Employee.Detail.css';
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setClostDetail, deleteEmployee } from "../../../redux/employee/employee.action";
import { getTime } from "../../../utilities/time.Utility";
import { ToastContainer, toast } from "react-toastify";

export const EmployeeDetail = () => {
    // local variable
    const dispatch = useDispatch();
    // get data from store
    const employee = useSelector(state => state.employee.employeeDetail);
    const isShow = useSelector(state => state.employee.isShowDetail);
    // check employee exist
    if (employee === null) return null;
    // handle off canvas
    const handleOffcanvas = () => {
        dispatch(setClostDetail());
    }
    // handle delete employee
    const handleDelete = (id) => {
        // confirm
        if (window.confirm('Are you sure you want to delete this employee?')) {
            dispatch(deleteEmployee(id))
                .then(() => {
                    toast.success('Delete employee success!');
                })
                .catch((error) => {
                    toast.error(`${error.message}`);
                })
        } else {
            return;
        }
    }

    return (
        <Offcanvas show={isShow} onHide={handleOffcanvas} placement="end" className="Employee_Detail">

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Employee Detail</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="employee_item">
                <div className="employee_detail_item employee_item_employeeId">
                    <label>Id</label>
                    <span>{employee.employeeId}</span>
                </div>

                <div className="employee_detail_item employee_item_employeeName">
                    <label>Name</label>
                    <span>{employee.employeeName}</span>
                </div>

                <div className="employee_detail_item employee_item_email">
                    <label>Email</label>
                    <span>{employee.email}</span>
                </div>

                <div className="employee_detail_item employee_item_employeeId">
                    <label>id</label>
                    <span>{employee.employeeId}</span>
                </div>

                <div className="employee_detail_item employee_item_phone">
                    <label>Phone</label>
                    <span>{employee.phone}</span>
                </div>

                <div className="employee_detail_item employee_item_dateOfBirth">
                    <label>Date Of Birth</label>
                    <span>{getTime(employee.dateOfBirth)}</span>
                </div>

                <div className="employee_detail_item employee_item_gender">
                    <label>Gender</label>
                    <span>{employee.gender}</span>
                </div>

                <div className="employee_button_delete">
                    <button className="btn btn-danger" onClick={() => handleDelete(employee.employeeId)}>Delete</button>
                </div>

            </Offcanvas.Body>
            <ToastContainer />
        </Offcanvas>
    )
}
