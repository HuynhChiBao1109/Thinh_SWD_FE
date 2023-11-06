import React from "react";
import { RackForm } from "../../forms/Rack/Rack.form";
import { RackList } from "../../components/Rack/RackList/Rack.list";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setShowFormCreate } from "../../redux/rack/rack.action";
import './Rack.page.css';

const RackPage = () => {
    const dispatch = useDispatch();

    const handleShowCreate = () => {
        dispatch(setShowFormCreate());
    }

    return (
        <div className="Rack_page">
            <Row>

                <Col lg={8}>
                    <h1>List Rack</h1>
                </Col>

                <Col lg={4}>
                    <Button variant="primary" onClick={handleShowCreate}>Add Rack</Button>
                </Col>
            </Row>

            <RackList />

            <RackForm />
        </div>
    )
}

export default RackPage;