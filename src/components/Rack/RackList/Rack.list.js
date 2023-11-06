import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Row, Col, Form } from "react-bootstrap";
import { getListRack, setShowFormEdit, deleteRack } from "../../../redux/rack/rack.action";
import "./Rack.list.css";
import { ToastContainer, toast } from "react-toastify";

export const RackList = () => {
    const dispatch = useDispatch();
    // get list rack from store
    const listRack = useSelector(state => state.rack.listRack);
    const totalPage = useSelector(state => state.rack.totalPage);
    const isChange = useSelector(state => state.rack.isChange);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 15;
    const [onChange, setOnChange] = useState(false);
    // get list rack from api
    useEffect(() => {
        dispatch(getListRack(searchTerm, sortColumn, sortOrder, page, pageSize));
    }, [onChange, isChange]);
    // check list rack
    if (listRack === null) {
        return <div>Loading...</div>;
    }
    // handle pagination
    const handlePagination = (page) => {
        setPage(page);
        setOnChange(!onChange);
    }
    // handle show edit
    const handleShowEdit = (data) => {
        dispatch(setShowFormEdit(data));
    }
    // handle delete
    const handleDelete = (id) => {
        // confirm 
        if (window.confirm("Do you want to delete this rack?")) {
            dispatch(deleteRack(id))
                .then(() => {
                    toast.success("Delete Rack Success!");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            return;
        }
    }
    // handle search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    // handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setOnChange(!onChange);
    }
    // handle change order
    const handleChangOrder = () => {
        const order = document.querySelector('.form_Rack_order').value;
        if (order === '') {
            setSortOrder('');
        } else {
            setSortOrder(order);
            setOnChange(!onChange);
        }
    }
    // handle change column
    const handleChangeColumn = () => {
        const column = document.querySelector('.form_Rack_column').value;
        if (column === '') {
            setSortColumn('');
        } else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }

    return (
        <div className="Rack_list">

            <Row className="Rack_SearchBar">
                <Col sm={4} lg={4}>
                    <div className="Rack_search_order">
                        <Form.Select className="form_Rack_order" onChange={handleChangOrder}>
                            <option value=''> Order by</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </Form.Select>
                    </div>
                </Col>

                <Col sm={4} lg={4}>
                    <div className="Rack_search_column">
                        <Form.Select className="form_Rack_column" onChange={handleChangeColumn}>
                            <option value=''>Order by Column</option>
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
                        <th>Rack Id</th>
                        <th>Shelf Id</th>
                        <th>Used Cell</th>
                        <th>Total Cell</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listRack.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="Rack_name">{item.rackId}</td>
                                    <td>{item.shelfId}</td>
                                    <td>{item.usedCell}</td>
                                    <td>{item.totalCell}</td>
                                    <td>{item.rackStatus}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShowEdit(item)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(item.rackId)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Row className="Rack_footer">
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