import React from "react";
import { StoreList } from "../../components/Store/StoreList/Store.List";
import { StoreDetail } from "../../components/Store/StoreDetail/Store.Detail";
import { StoreForm } from "../../forms/Store/Store.form";
import './Store.page.css'
import { setShowFormCreate } from "../../redux/store/store.action";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

import './Store.page.css'

const StorePage = () => {
    const dispatch = useDispatch();
    // handle show create new
    const handleShowCreateNew = () => {
        dispatch(setShowFormCreate());
    }

    return (
        <div className="Store_Page">
            <Row>
                <Col lg={8}>
                    <h1>List Store</h1>
                </Col>
                <Col lg={4}>
                    <Button type="button" onClick={() => handleShowCreateNew()} className='Store_page_button_create'>
                        Create Store
                    </Button>
                </Col>
            </Row>

            <StoreList />

            <StoreDetail />

            <StoreForm />
        </div>
    )
}

export default StorePage;