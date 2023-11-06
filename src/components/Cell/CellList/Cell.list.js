import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCell, setShowFormUpdate, deleteCell } from "../../../redux/cell/cell.action";
import { Col, Pagination, Row, Form, Button } from "react-bootstrap";
import './Cell.list.css';
import { toast } from "react-toastify";

export const CellList = () => {
    const dispatch = useDispatch();
    // init state
    const listCell = useSelector(state => state.cell.listCell);
    const totalPage = useSelector(state => state.cell.totalPage);
    const isChange = useSelector(state => state.cell.isChange);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 15;
    const [onChange, setOnChange] = useState(false);
    // get list cell from server
    useEffect(() => {
        dispatch(getListCell(searchTerm, sortColumn, sortOrder, page, pageSize));
    }, [onChange, isChange])
    // check if listCell is null then return Loading...
    if (listCell === null) return <h1>Loading...</h1>
    // handle pagination
    const handlePagination = (page) => {
        setPage(page);
        setOnChange(!onChange);
    }
    // handle show edit form
    const handleShowEdit = (data) => {
        dispatch(setShowFormUpdate(data));
    }
    // handle delete cell
    const handleDelete = (id) => {
        // confirm 
        if (window.confirm("Are you want to delete this cell?")) {
            dispatch(deleteCell(id))
                .then(() => {
                    toast.success("Delete cell successfully!");
                })
                .catch(err => {
                    toast.error(err.response.data.message);
                })
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
        const order = document.querySelector('.form_Cell_order').value;
        if (order === '') {
            setSortOrder('');
        } else {
            setSortOrder(order);
            setOnChange(!onChange);
        }
    }
    // handle change column
    const handleChangeColumn = (e) => {
        const column = document.querySelector('.form_Cell_column').value;
        if (column === '') {
            setSortColumn('');
        } else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }
    return (
        <div className="Cell_list">

            <Row className="Cell_SearchBar">
                <Col sm={4} lg={4}>
                    <div className="Cell_search_order">
                        <Form.Select className="form_Cell_order" onChange={handleChangOrder}>
                            <option value=''> Order by</option>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </Form.Select>
                    </div>
                </Col>

                <Col sm={4} lg={4}>
                    <div className="Cell_search_column">
                        <Form.Select className="form_Cell_column" onChange={handleChangeColumn}>
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
                        <th>Cell Id</th>
                        <th>Rack Id</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCell.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="Cell_name">{item.cellId}</td>
                                    <td className="Cell_mail">{item.rackId}</td>
                                    <td className="Cell_mail">{item.cellStatus}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => handleShowEdit(item)}>Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.cellId)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Row className="Cell_footer">
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
        </div>
    )
}