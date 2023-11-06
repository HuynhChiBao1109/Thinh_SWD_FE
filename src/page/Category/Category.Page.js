import React from "react";
import { Col, Row } from "react-bootstrap";
import { CategoryList } from "../../components/Category/CategoryList/Category.List";
import { CategoryDetail } from "../../components/Category/CategoryDetail/Category.Detail";
import "./Category.Page.css";

const CategoryPage = () => {
    return (
        <div className="Category_page">
            <Row>
                <Col lg={8}>
                    <h1>List Category</h1>
                </Col>
            </Row>

            <CategoryList />

            <CategoryDetail />

        </div>
    )
}

export default CategoryPage;