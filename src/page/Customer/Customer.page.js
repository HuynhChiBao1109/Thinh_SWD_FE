import React from "react";
import { CustomerList } from "../../components/Customer/CustomerList/Customer.List";
import { CustomerDetail } from "../../components/Customer/CustomerDetail/Customer.Detail";
import { CustomerForm } from "../../forms/Customer/Customer.form";
import { setShowFormCreate } from "../../redux/customer/customer.action";
import { useDispatch } from "react-redux";
import "./Customer.page.css";
import { Col, Row, Button } from "react-bootstrap";

const CustomerPage = () => {
    // local variable
    const dispatch = useDispatch();
    // handle show create form
    const handleShowCreate = () => {
        dispatch(setShowFormCreate());
    }
    return (
        <div className="Customer_page">

            <Row>

                <Col lg={8}>
                    <h1>List Customer</h1>
                </Col>

                <Col lg={4}>
                    <Button type="button" onClick={handleShowCreate}>
                        Create Customer
                    </Button>
                </Col>
            </Row>

            <CustomerList />
            <CustomerDetail />
            <CustomerForm />
        </div>
    )
}

export default CustomerPage;