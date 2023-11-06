import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";
import { useSelector } from "react-redux";
import './Header.css';

export const Header = () => {

    const [isLogin, setIsLogin] = useState(false);
    const isChange = useSelector((state) => state.authen.isChange);

    useEffect(() => {
        const token = getTokenFromCookie();
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [isChange])


    return (
        <Row className="Header">
            <Col lg={9}>
            </Col>

            <Col lg={3} className="Header_login d-flex align-items-center justify-content-center">
                {
                    isLogin ?
                        <div>

                            <i class="fa-solid fa-user user_icon"></i>

                            <Link to="/logout" className="Header_login_text">Logout</Link>
                        </div>

                        :
                        <Link to="/login" className="Header_login_text">Login</Link>
                }
            </Col>
        </Row>
    )
}