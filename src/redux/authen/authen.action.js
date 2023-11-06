import axios from "axios";
import { server } from "../../shared/contants";
import { removeTokenFromCookie, saveTokenToCookie } from "../../utilities/cookie.Utility";

export const loginSucess = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}

export const login = (body) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${server}/auth`, body);
            saveTokenToCookie(response.data);
            dispatch(loginSucess(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            removeTokenFromCookie();
            dispatch(logoutSucess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const logoutSucess = () => {
    return {
        type: 'LOGOUT'
    }
}

export const loginByGoogle = (body) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${server}/auth/google`);
            saveTokenToCookie(response.data);
            dispatch(loginSucess(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}