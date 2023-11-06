import React, { useEffect, useState } from "react";
import { getTokenFromCookie } from "../../../utilities/cookie.Utility";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { getListStore } from "../../../redux/store/store.action";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Row, Col, Form, Button } from "react-bootstrap";
import { getDetailStoreById } from "../../../redux/store/store.action";
import { setShowFormCreate } from "../../../redux/store/store.action";
import './Store.List.css'

export const StoreList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // init state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [onChange, setOnChange] = useState(false);
    const isChange = useSelector((state) => state.store.isChange);
    // check token
    useEffect(() => {
        const token = getTokenFromCookie();
        if (!token) {
            toast.error('Please login to continue');
            navigate('/login');
        } else {
            dispatch(getListStore(searchTerm, sortColumn, sortOrder, page, pageSize));
        }
    }, [onChange, isChange])
    // get data from store
    const listStore = useSelector((state) => state.store.listStore);
    const totalPage = useSelector((state) => state.store.totalPage);
    // handle pagination
    const handlePagination = (page) => {
        setPage(page);
        setOnChange(!onChange);
    }
    // handle change order
    const handleChangOrder = () => {
        const order = document.querySelector('.form_order_control').value;
        if (order === '') {
            setSortOrder('');
        } else {
            setSortOrder(order);
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
    // handle change column
    const handleChangeColumn = () => {
        const column = document.querySelector('.form_column_control').value;
        if (column === '') {
            setSortColumn('');
        } else {
            setSortColumn(column);
            setOnChange(!onChange);
        }
    }
    // handle show detail
    const handleShowDetail = (id) => {
        dispatch(getDetailStoreById(id));
    }

    return (
        <div className="Store_List">

            <div className="Store_List_Search">
                <Row>
                    <Col sm={4}>
                        <div className="Store_search_order">
                            <Form.Select className="form_order_control" onChange={handleChangOrder}>
                                <option value=''> Order by</option>
                                <option value="Ascending">Ascending</option>
                                <option value="Descending">Descending</option>
                            </Form.Select>
                        </div>
                    </Col>

                    <Col sm={3}>
                        <div className="Store_search_column">
                            <Form.Select className="form_column_control" onChange={handleChangeColumn}>
                                <option value=''>Order by Column</option>
                                <option value="storeId">Id</option>
                                <option value="storeName">Name</option>
                                <option value="storeAddress">Address</option>
                                <option value="adminName">Admin</option>
                                <option value="storeStatus">Status</option>
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

            <div className="Store_List_Item">

                {listStore.map((store, index) => (
                    <div key={index} className="store_list_item_content" onClick={() => handleShowDetail(store.storeId)}>
                        <h4>{store.storeName}</h4>
                    </div>
                ))}
            </div>

            <Row className="Store_footer">
                <Col lg={8}>
                    <h3>Page {page} of {totalPage}</h3>
                </Col>
                <Col lg={4}>
                    <div className="Store_List_Paging">
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