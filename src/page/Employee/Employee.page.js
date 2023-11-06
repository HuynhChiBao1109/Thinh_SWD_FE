import React from "react";
import { EmployeeList } from "../../components/Employee/EmployeeList/Employee.List";
import { EmployeeDetail } from "../../components/Employee/EmployeeDetail/Employee.Detail";
import { EmployeeForm } from "../../forms/Employee/Employee.form";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setShowFormCreate } from "../../redux/employee/employee.action";
import { Row, Col } from "react-bootstrap";
import "./Employee.page.css";

const EmployeePage = () => {

    const dispatch = useDispatch();

    const handleShowCreate = () => {
        dispatch(setShowFormCreate())
    }

    return (
        <div className="Employee_Page">
            <Row>

                <Col lg={8}>
                    <h1>List Employee</h1>
                </Col>

                <Col lg={4}>
                    <Button type="button" onClick={() => handleShowCreate()} className='Employee_page_button_create'>
                        Create Employee
                    </Button>
                </Col>
            </Row>


            <EmployeeList />

            <EmployeeDetail />
            <EmployeeForm />
        </div>
    )
}

export default EmployeePage;