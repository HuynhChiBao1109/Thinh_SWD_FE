import axios from "axios";
import { server } from "../../shared/contants";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";

export const getListStore = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/stores`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                },
                params: {
                    searchTerm,
                    sortColumn,
                    sortOrder,
                    page,
                    pageSize
                }
            })
            dispatch(getListStoreSuccess(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

export const getListStoreSuccess = (data) => {
    return {
        type: 'GET_LIST_STORE',
        payload: data
    }
}

const setShowDetail = (data) => {
    return {
        type: 'SET_SHOW_DETAIL_STORE',
        payload: data
    }
}

export const getDetailStoreById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/stores/${id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(setShowDetail(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

export const setCloseDetail = () => {
    return {
        type: 'SET_CLOSE_DETAIL_STORE'
    }
}

export const setShowFormCreate = () => {
    return {
        type: 'SET_SHOW_FORM_CREATE_STORE'
    }
}

export const setCloseFormCreate = () => {
    return {
        type: 'SET_CLOSE_FORM_CREATE_STORE'
    }
}

export const setShowFormUpdate = (data) => {
    return {
        type: 'SET_SHOW_FORM_UPDATE_STORE',
        payload: data
    }
}

export const createNewStore = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${server}/stores`, data, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(createNewStoreSuccess());
            console.log(response);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const createNewStoreSuccess = () => {
    return {
        type: 'CREATE_NEW_STORE',
    }

}

export const updateStore = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                storeName: data.storeName,
                storeAddress: data.storeAddress,
                adminId: data.adminId,
            }
            const response = await axios.put(`${server}/stores/${data.storeId}`, value, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(updateStoreSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const updateStoreSuccess = () => {
    return {
        type: 'UPDATE_STORE',
    }
}

export const deleteStore = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${server}/stores/${id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(deleteStoreSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const deleteStoreSuccess = () => {
    return {
        type: 'DELETE_STORE',
    }
}