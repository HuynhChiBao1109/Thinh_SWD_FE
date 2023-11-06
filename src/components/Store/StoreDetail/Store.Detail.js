import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCloseDetail, deleteStore } from "../../../redux/store/store.action";
import { setShowFormUpdate } from "../../../redux/store/store.action";
import { Offcanvas } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./Store.Detail.css";

export const StoreDetail = () => {
    const dispatch = useDispatch();
    // get data from store
    const show = useSelector((state) => state.store.isShowDetail);
    const store = useSelector((state) => state.store.storeDetail);
    // check exist store
    if (store === null) return null;
    // handle close offcanvas
    const handleOffcanvas = () => {
        dispatch(setCloseDetail());
    }
    // handle show update form
    const handleShowUpdate = (store) => {
        dispatch(setShowFormUpdate(store));
    }
    // handle delete store
    const handleDelete = (id) => {
        // confirm 
        if (window.confirm('Are you sure you want to delete this store?')) {
            // call api delete
            dispatch(deleteStore(id))
                .then(() => {
                    toast.success('Delete store success!');
                })
                .catch(() => {
                    toast.error('Delete store error!');
                })
        } else {
            return;
        }
    }


    return (
        <Offcanvas show={show} onHide={handleOffcanvas} placement="end" className="Store_Detail_Page">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Store Detail</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="store_detail_item store_detail_id">
                    <label>Id</label>
                    <span>{store.storeId}</span>
                </div>

                <div className="store_detail_item store_detail_name">
                    <label>Store name</label>
                    <span>{store.storeName}</span>
                </div>

                <div className="store_detail_item store_detail_address">
                    <label>Address</label>
                    <span>{store.storeAddress}</span>
                </div>

                <div className="store_detail_item store_detail_adminName">
                    <label>Admin</label>
                    <span>{store.adminName}</span>
                </div>

                <div className="store_detail_item store_detail_status">
                    <label>Status</label>
                    <span>{store.storeStatus}</span>
                </div>

                <div className="store_detail_update_button">
                    <button className="btn btn-primary" onClick={() => handleShowUpdate(store)}>Update</button>\
                    <button className="btn btn-danger" onClick={() => handleDelete(store.storeId)}>Delete</button>
                </div>


            </Offcanvas.Body>
            <ToastContainer />
        </Offcanvas>
    )
}