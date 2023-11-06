import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";
import { decodeToken } from "../../utilities/jwt.Utility";
import { useSelector } from "react-redux";

export const SideBar = () => {
    // get data from cookie
    const token = getTokenFromCookie();
    const isChange = useSelector((state) => state.authen.isChange);
    // decode token
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const user = decodeToken(token);
            setUser(user);
        } else {
            setUser(null);
        }
    }, [isChange])

    if (user === null) return null;

    return (
        <Nav className="col-md-12 d-none d-md-block bg-light Sidebar">

            {
                user && user.role === 'ADMIN' ?
                    <Nav.Item className="sidebar_item">
                        <i class="fa-solid fa-store"></i>
                        <Link className="sidebar_item" to='/store'>Store</Link>
                    </Nav.Item>
                    : null
            }

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-person"></i>
                <Link className="sidebar_item" to='/employee'>Employee</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-person-military-pointing"></i>
                <Link className="sidebar_item" to='/customer'>Customer</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-brands fa-slack"></i>
                <Link className="sidebar_item" to='/storageAreas'>Storage Areas</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-filter"></i>
                <Link className="sidebar_item" to='/category'>Category</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-list"></i>
                <Link className="sidebar_item" to='/shelve'>Shelve</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-gears"></i>
                <Link className="sidebar_item" to='/cell'>Cell</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-shopping-cart"></i>
                <Link className="sidebar_item" to='/order'>Order</Link>
            </Nav.Item>

            <Nav.Item className="sidebar_item">
                <i class="fa-solid fa-box"></i>
                <Link className="sidebar_item" to='/rack'>Rack</Link>
            </Nav.Item>
        </Nav>
    )
}