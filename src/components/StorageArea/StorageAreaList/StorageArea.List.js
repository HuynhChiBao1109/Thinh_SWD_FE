import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getListStorageArea, setShowFormUpdate, deleteStorageArea } from "../../../redux/storageArea/storageArea.action";
import { Pagination, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./StorageArea.List.css";


export const StorageAreaList = () => {
    // local variable
    const dispatch = useDispatch();
    // list storage area
    const listStorageArea = useSelector(state => state.storageArea.listStorageArea);
    const isChange = useSelector(state => state.storageArea.isChange);
    // get page 
    const totalPage = useSelector(state => state.storageArea.totalPage);
    // init state
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 15;
    const [onChange, setOnChange] = useState(false);
    // get list storage area
    useEffect(() => {
        dispatch(getListStorageArea(searchTerm, sortColumn, sortOrder, page, pageSize));
    }, [onChange, isChange])
    // check list exist
    if (listStorageArea === null) return <h1>Loading...</h1>
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
        const order = document.querySelector('.form_storageArea_order').value;
        if (order === '') {
            setSortOrder('');
        } else {
            setSortOrder(order);
            setOnChange(!onChange);
        }
    }
    // handle change column
    const handleChangeColumn = () => {
        const column = document.querySelector('.form_storageArea_column').value;
        if (column === '') {
            setSortColumn('');
        } else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }
    // handle show update
    const handleShowUpdate = (item) => {
        dispatch(setShowFormUpdate(item));
    }
    // handle delete
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this storage area?')) {
            dispatch(deleteStorageArea(id))
                .then(() => {
                    toast.success("Delete StorageArea Success!");
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                })
        }
    }

    return (
        <div className="StorageArea_List">

            <div className="StorageArea_SearchBar">
                <Row>
                    <Col sm={4}>
                        <div className="StorageArea_search_order">
                            <Form.Select className="form_storageArea_order" onChange={handleChangOrder}>
                                <option value=''> Order by</option>
                                <option value="Ascending">Ascending</option>
                                <option value="Descending">Descending</option>
                            </Form.Select>
                        </div>
                    </Col>

                    <Col sm={3}>
                        <div className="StorageArea_search_column">
                            <Form.Select className="form_storageArea_column" onChange={handleChangeColumn}>
                                <option value=''>Order by Column</option>
                                <option value="areaId">areaId</option>
                                <option value="storeName">storeName</option>
                                <option value="categoryName">categoryName</option>
                                <option value="usedShelf">usedShelf</option>
                                <option value="totalShelf">totalShelf</option>
                                <option value="areaStatus">areaStatus</option>
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
                        <th>Store Name</th>
                        <th>Category Name</th>
                        <th>Used Shelf</th>
                        <th>Total Shelf</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listStorageArea.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.storeName}</td>
                                    <td>{item.categoryName}</td>
                                    <td>{item.usedShelf}</td>
                                    <td>{item.totalShelf}</td>
                                    <td>{item.areaStatus}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleShowUpdate(item)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.areaId)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Row className="StorageArea_Footer">
                <Col lg={8}>
                    <h3>Page {page} of {totalPage}</h3>
                </Col>
                <Col lg={4}>
                    <div className="StorageArea_List_Paging">
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