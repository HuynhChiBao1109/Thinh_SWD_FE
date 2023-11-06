import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListEmployee } from "../../../redux/employee/employee.action";
import { getEmployeeDetail } from "../../../redux/employee/employee.action";
import { ToastContainer } from "react-toastify";
import "./Employee.List.css";
import { Button, Pagination, Col, Form, Row } from "react-bootstrap";
import { setShowFormUpdate } from "../../../redux/employee/employee.action";

export const EmployeeList = () => {
    const dispatch = useDispatch();
    const listEmployee = useSelector(state => state.employee.listEmployee);
    // init state
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 15;
    const [onChange, setOnChange] = useState(false);
    // get list Employee\
    useEffect(() => {
        dispatch(getListEmployee(searchTerm, sortColumn, sortOrder, page, pageSize));
    }, [onChange])
    // total page
    const totalPage = useSelector(state => state.employee.totalPage);
    // check if listEmployee is null then return Loading...
    if (listEmployee === null) return <h1>Loading...</h1>
    // handle show edit
    const handleShowEdit = (employee) => {
        dispatch(setShowFormUpdate(employee));
    }
    // handle show detail
    const handleShowDetail = (id) => {
        dispatch(getEmployeeDetail(id));
    }
    // handle pagination
    const handlePagination = (page) => {
        setPage(page);
        setOnChange(!onChange);
    }
    // handle search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setOnChange(!onChange);
    }
    // handle change order
    const handleChangOrder = () => {
        const order = document.querySelector('.form_employee_order').value;
        if (order === '') {
            setSortOrder('');
        } else {
            setSortOrder(order);
            setOnChange(!onChange);
        }
    }
    // handle change column
    const handleChangeColumn = (e) => {
        const column = document.querySelector('.form_employee_column').value;
        if (column === '') {
            setSortColumn('');
        } else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }


    return (
        <div className="Employee_List">


            <Row className="Employee_SearchBar">
                <Col sm={4} lg={4}>
                    <div className="Employee_search_order">
                        <Form.Select className="form_employee_order" onChange={handleChangOrder}>
                            <option value=''> Order by</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </Form.Select>
                    </div>
                </Col>

                <Col sm={4} lg={4}>
                    <div className="Employee_search_column">
                        <Form.Select className="form_employee_column" onChange={handleChangeColumn}>
                            <option value=''>Order by Column</option>
                            <option value="employeeId">Id</option>
                            <option value="employeeName">Name</option>
                            <option value="email">Email</option>
                            <option value="phone">phone</option>
                            <option value="dateOfBirth">Date of Birth</option>
                            <option value="gender">gender</option>
                        </Form.Select>
                    </div>
                </Col>

                <Col sm={4} lg={4}>
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
                        listEmployee.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="employee_name">{item.employeeName}</td>
                                    <td className="employee_mail">{item.email}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShowEdit(item)}>Edit</Button>
                                        <Button variant="success" onClick={() => handleShowDetail(item.employeeId)}>Detail</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Row className="Employee_footer">
                <Col lg={8}>
                    <h3>Page {page} of {totalPage}</h3>
                </Col>
                <Col lg={4}>
                    <div>
                        <Pagination>

                            <Pagination.Prev
                                onClick={() => handlePagination(page - 1)}
                                {...page <= 1 && { hidden: true }}
                            />

                            <Pagination.Item
                                onClick={() => handlePagination(page - 1)}
                                {...page <= 1 && { hidden: true }}
                            >
                                {page - 1}
                            </Pagination.Item>

                            <Pagination.Item active>{page}</Pagination.Item>

                            <Pagination.Item
                                onClick={() => handlePagination(page + 1)}
                                {...page >= totalPage && { hidden: true }}
                            >
                                {page + 1}
                            </Pagination.Item>


                            <Pagination.Item
                                onClick={() => handlePagination(page + 2)}
                                {...page >= totalPage - 1 && { hidden: true }}
                            >
                                {page + 2}
                            </Pagination.Item>

                            <Pagination.Ellipsis
                                {...page >= totalPage - 2 && { hidden: true }}
                            />

                            <Pagination.Item
                                onClick={() => handlePagination(totalPage)}
                                {...page >= totalPage - 3 && { hidden: true }}
                            >
                                {totalPage}
                            </Pagination.Item>

                            <Pagination.Next
                                onClick={() => handlePagination(page + 1)}
                                {...page >= totalPage && { hidden: true }}
                            />
                        </Pagination>

                    </div>
                </Col>
            </Row>

            <ToastContainer />
        </div>
    )
}