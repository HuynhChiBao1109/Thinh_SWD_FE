import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ShelveList } from "../../components/Shelve/ShelveList/Shelve.list";
import { ShelveForm } from "../../forms/Shelve/Shelve.form";
import { setShowFormCreate } from "../../redux/shelve/shelve.action";
import { useDispatch } from "react-redux";
import "./Shelve.page.css";

const ShelvePage = () => {
    const dispatch = useDispatch();
    // handle show form create
    const handleShowCreate = () => {
        dispatch(setShowFormCreate());
    }

    return (
        <div className="Shelve_page">
            <Row>
                <Col lg={8}>
                    <h1>List Shelve</h1>
                </Col>

                <Col lg={4}>
                    <Button type="button" onClick={handleShowCreate}>
                        Add Shelve
                    </Button>
                </Col>

                <ShelveList />

                <ShelveForm />
            </Row>

        </div>
    )
}

export default ShelvePage;