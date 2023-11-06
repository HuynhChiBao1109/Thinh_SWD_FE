import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getListCutomer, setShowFormUpdate } from "../../../redux/customer/customer.action";
import { Form, Row, Col } from "react-bootstrap";
import { getDetailCustomerById } from "../../../redux/customer/customer.action";
import { useNavigate } from "react-router-dom";
import './Customer.List.css'

export const CustomerList = () => {
    // local variable
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // get data from store
    const listCustomer = useSelector(state => state.customer.listCustomer);
    // init state
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const page = 1;
    const pageSize = 10;
    const [onChange, setOnChange] = useState(false);
    const isChange = useSelector(state => state.customer.isChange);
    // get list customer from server
    useEffect(() => {
        dispatch(getListCutomer(searchTerm, sortColumn, sortOrder, page, pageSize))
            .then(() => {

            }
            )
            .catch((error) => {
                toast.error(error.message);
                if (error.message === 'Token is null') {
                    navigate('/login');
                }
            })
    }, [onChange, isChange]);
    // check if listCustomer is null then return Loading...
    if (listCustomer === null) return <h1>Loading...</h1>
    // handle change Order 
    const handleChangOrder = () => {
        const order = document.querySelector('.form_customer_order').value;
        if (order === '') {
            setSortOrder('');
        } else {
            setSortOrder(order);
            setOnChange(!onChange);
        }
    }
    // handle change Column
    const handleChangeColumn = () => {
        const column = document.querySelector('.form_customer_column').value;
        if (column === '') {
            setSortColumn('');
        } else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }
    // handle search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setOnChange(!onChange);
    }
    // handle show detail
    const handleShowDetail = (id) => {
        dispatch(getDetailCustomerById(id))
            .then(() => { })
            .catch((error) => {
                toast.error(error.message);
                if (error.message === 'Token is null') {
                    navigate('/login');
                }
            })
    }

    return (
        <div className="Customer_List">
            <div className="Customer_SearchBar">
                <Row>
                    <Col sm={4}>
                        <div className="Store_search_order">
                            <Form.Select className="form_customer_order" onChange={handleChangOrder}>
                                <option value=''> Order by</option>
                                <option value="Ascending">Ascending</option>
                                <option value="Descending">Descending</option>
                            </Form.Select>
                        </div>
                    </Col>

                    <Col sm={3}>
                        <div className="Store_search_column">
                            <Form.Select className="form_customer_column" onChange={handleChangeColumn}>
                                <option value=''>Order by Column</option>
                                <option value="customerId">Id</option>
                                <option value="customerName">Name</option>
                                <option value="email">Email</option>
                                <option value="username">username</option>
                                <option value="phone">Phone</option>
                                <option value="dateOfBirth">Date of Birth</option>
                                <option value="gender">gender</option>
                            </Form.Select>
                        </div>
                    </Col>

                    <Col sm={4}>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleSearchChange}
                            />
                            <Button type="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCustomer.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="employee_name">{item.customerName}</td>
                                    <td className="employee_mail">{item.email}</td>
                                    <td>
                                        <Button variant="success" onClick={() => handleShowDetail(item.customerId)}>Detail</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <ToastContainer />
        </div>
    )
}