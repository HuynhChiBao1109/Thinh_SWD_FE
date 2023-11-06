import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { setCloseDetailCategory } from "../../../redux/category/category.aciton";
import './Category.Detail.css';

export const CategoryDetail = () => {
    const dispatch = useDispatch();
    // get data from store
    const show = useSelector((state) => state.category.isShowDetail);
    const category = useSelector((state) => state.category.detailCategory);
    // check exist store
    if (category === null) return null;
    // handle close offcanvas
    const handleOffcanvas = () => {
        dispatch(setCloseDetailCategory());
    }


    return (
        <Offcanvas show={show} onHide={handleOffcanvas} placement="end" className="Category_Detail_Page">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Category Detail</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <div className="category_detail_item category_detail_id">
                    <label>Category ID:</label>
                    <span>{category.categoryId}</span>
                </div>

                <div className="category_detail_item category_detail_name">
                    <label>Category Name:</label>
                    <span>{category.categoryName}</span>
                </div>

                <div className="category_detail_item category_detail_description">
                    <label>Description:</label>
                    <span>{category.categoryDescription}</span>
                </div>

            </Offcanvas.Body>
        </Offcanvas>
    )
}