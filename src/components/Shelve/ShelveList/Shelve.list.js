import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Pagination, Row } from "react-bootstrap";
import { getListShelve } from "../../../redux/shelve/shelve.action";
import { Form, Button } from "react-bootstrap";
import { setShowFormUpdate, deleteShelve } from "../../../redux/shelve/shelve.action";
import './Shelve.list.css';
import { ToastContainer, toast } from "react-toastify";

export const ShelveList = () => {
    const dispatch = useDispatch();
    // get data from store
    const listShelve = useSelector((state) => state.shelve.listShelve);
    const totalPage = useSelector((state) => state.shelve.totalPage);
    const isChange = useSelector((state) => state.shelve.isChange);
    // init state
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortColumn, setSortColumn] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [onChange, setOnChange] = React.useState(false);
    const pageSize = 15;
    // get list 
    React.useEffect(() => {
        dispatch(getListShelve(searchTerm, sortColumn, sortOrder, page, pageSize));
    }, [onChange, isChange]);
    // check list shelve
    if (listShelve === null) return <div>Loading...</div>;
    // handle pagination
    const handlePagination = (page) => {
        setPage(page);
        setOnChange(!onChange);
    }
    // handle search]
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    // handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        setOnChange(!onChange);
    }
    // handle change column
    const handleChangeColumn = () => {
        const column = document.querySelector(".form_shelve_column").value;
        if (column === "") {
            setSortColumn("");
        }
        else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }
    // handle change order
    const handleChangOrder = () => {
        const order = document.querySelector(".form_shelve_order").value;
        if (order === "") {
            setSortOrder("");
        }
        else {
            setSortOrder(order);
            setOnChange(!onChange);
        }
    }
    // handle delete
    const handleDelete = (id) => {
        if (window.confirm("Are you want to delete this shelve?")) {
            dispatch(deleteShelve(id))
                .then(() => {
                    setOnChange(!onChange);
                    toast.success("Delete shelve success!");
                })
                .catch((error) => {
                    toast.error(error.message);
                })
        } else {
            return;
        }
    }
    // handle show update
    const handleShowUpdate = (data) => {
        dispatch(setShowFormUpdate(data));
    }

    return (
        <div className="Shelve_list">

            <Row className="Shelve_SearchBar">
                <Col sm={4} lg={4}>
                    <div className="Shelve_search_order">
                        <Form.Select className="form_shelve_order" onChange={handleChangOrder}>
                            <option value=''> Order by</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </Form.Select>
                    </div>
                </Col>

                <Col sm={4} lg={4}>
                    <div className="Shelve_search_column">
                        <Form.Select className="form_shelve_column" onChange={handleChangeColumn}>
                            <option value=''>Order by Column</option>
                            {/* <option value="employeeId">Id</option>
                            <option value="employeeName">Name</option>
                            <option value="email">Email</option>
                            <option value="phone">phone</option>
                            <option value="dateOfBirth">Date of Birth</option>
                            <option value="gender">gender</option> */}
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
                        <th>Shelve Id</th>
                        <th>Box shape</th>
                        <th>Used Rack</th>
                        <th>Total Rack</th>
                        <th>Status</th>
                        <th>Area Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listShelve.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.shelfId}</td>
                                    <td>{item.boxShape}</td>
                                    <td>{item.usedRack}</td>
                                    <td>{item.totalRack}</td>
                                    <td>{item.shelfStatus}</td>
                                    <td>{item.areaId}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShowUpdate(item)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(item.shelfId)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Row className="Shelve_Footer">
                <Col lg={8}>
                    <h3>Page {page} of {totalPage}</h3>
                </Col>
                <Col lg={4}>
                    <div className="Shelvea_List_Paging">
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
        </div >
    )
}