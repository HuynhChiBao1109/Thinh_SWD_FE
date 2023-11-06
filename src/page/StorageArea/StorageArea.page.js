import React from "react";
import { StorageAreaList } from "../../components/StorageArea/StorageAreaList/StorageArea.List";
import "./StorageArea.page.css";
import { Col, Row, Button } from "react-bootstrap";
import { StorageAreaForm } from "../../forms/StorageArea/StorageArea.form";
import { setShowFormCreate } from "../../redux/storageArea/storageArea.action";
import { useDispatch } from "react-redux";

const StorageAreaPage = () => {

    const dispatch = useDispatch();

    const handleShowCreate = () => {
        dispatch(setShowFormCreate());
    }

    return (
        <div className="StorageArea_Page">

            <Row>

                <Col lg={8}>
                    <h1>List Storage Area</h1>
                </Col>

                <Col lg={4}>
                    <Button type="button" className='StorageArea_page_button_create' onClick={handleShowCreate}>
                        Create Storage Area
                    </Button>
                </Col>
            </Row>

            <StorageAreaList />

            <StorageAreaForm />
        </div>
    )
}

export default StorageAreaPage;