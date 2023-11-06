import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory, getCategoryById } from "../../../redux/category/category.aciton";
import './Category.List.css';


export const CategoryList = () => {
    const dispatch = useDispatch();
    // get list category from store
    const listCategory = useSelector(state => state.category.listCategory);

    useEffect(() => {
        dispatch(getListCategory());
    }, [])
    // handle show detail category
    const handleShowDetail = (id) => {
        dispatch(getCategoryById(id));
    }

    return (
        <div className="Category_list">
            {
                listCategory && listCategory.map((item, index) => {
                    return (
                        <div className="category_item" key={index} onClick={() => handleShowDetail(item.categoryId)}>
                            <h4>{item.categoryName}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}