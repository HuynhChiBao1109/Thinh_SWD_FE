import axios from "axios";
import { server } from '../../shared/contants'
import { getTokenFromCookie } from "../../utilities/cookie.Utility";

export const getListStorageArea = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/storageareas`, {
                params: {
                    searchTerm: searchTerm,
                    sortColumn: sortColumn,
                    sortOrder: sortOrder,
                    page: page,
                    pageSize: pageSize,
                },
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
            });
            dispatch(getListStorageAreaSuccess(response.data));
        } catch (error) {

        }
    }
}

const getListStorageAreaSuccess = (data) => {
    return {
        type: "GET_LIST_STORAGE_AREA",
        payload: data,
    }
}


export const setShowFormCreate = () => {
    return {
        type: "SET_SHOW_FORM_CREATE",
    }
}

export const setCloseForm = () => {
    return {
        type: "SET_CLOSE_FORM",
    }
}


export const setShowFormUpdate = (data) => {
    return {
        type: "SET_SHOW_FORM_UPDATE",
        payload: data,
    }
}

export const createStorageArea = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(`${server}/storageareas`, data, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
            });
            dispatch(createStorageAreaSuccess());
        } catch (error) {
            throw error;
        }
    }
}

const createStorageAreaSuccess = () => {
    return {
        type: "CREATE_STORAGE_AREA"
    }
}

export const updateStorageArea = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                categoryId: data.categoryId,
                storeId: data.storeId,
                totalShelf: data.totalShelf,
            }

            await axios.put(`${server}/storageareas/${data.areaId}`, value, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
            });
            dispatch(updateStorageAreaSuccess());
        } catch (error) {
            throw error;
        }
    }
}

const updateStorageAreaSuccess = () => {
    return {
        type: "UPDATE_STORAGE_AREA"
    }
}

export const deleteStorageArea = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${server}/storageareas/${id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
            });
            dispatch(deleteStorageAreaSuccess());
        } catch (error) {
            throw error;
        }
    }
}

const deleteStorageAreaSuccess = () => {
    return {
        type: "DELETE_STORAGE_AREA"
    }
}