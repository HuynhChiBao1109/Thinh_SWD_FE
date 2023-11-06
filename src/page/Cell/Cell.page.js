import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import './Cell.page.css';
import { CellList } from "../../components/Cell/CellList/Cell.list";
import { CellForm } from "../../forms/Cell/Cell.form";
import { setShowFormCreate } from "../../redux/cell/cell.action";
import { useDispatch } from "react-redux";

const CellPage = () => {
    const dispatch = useDispatch();
    // handle show create form
    const handleShowCreate = () => {
        dispatch(setShowFormCreate());
    }

    return (
        <div className="Cell_page">
            <Row>

                <Col lg={8}>
                    <h1>List Cell</h1>
                </Col>

                <Col lg={4}>
                    <Button type="button" onClick={handleShowCreate}>
                        Create Cell
                    </Button>
                </Col>
            </Row>

            <CellList />

            <CellForm />

        </div>
    );
}

export default CellPage;