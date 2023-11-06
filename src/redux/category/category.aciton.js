import axios from "axios";
import { server } from "../../shared/contants";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";

export const getListCategory = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/categories`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(getListCategorySuccess(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

const getListCategorySuccess = (data) => {
    return {
        type: 'GET_LIST_CATEGORY',
        payload: data
    }
}

export const getCategoryById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(getCategoryByIdSuccess(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

const getCategoryByIdSuccess = (data) => {
    return {
        type: 'GET_CATEGORY_BY_ID',
        payload: data
    }
}

export const setCloseDetailCategory = () => {
    return {
        type: 'CLOSE_DETAIL_CATEGORY',
    }
}