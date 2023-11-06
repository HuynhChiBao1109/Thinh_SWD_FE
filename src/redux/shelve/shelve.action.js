import axios from "axios";
import { server } from "../../shared/contants";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";

export const getListShelve = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.get(`${server}/shelves`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    searchTerm,
                    sortColumn,
                    sortOrder,
                    page,
                    pageSize,
                },
            });
            dispatch(getListShelveSuccess(response.data));
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

const getListShelveSuccess = (data) => {
    return {
        type: 'GET_LIST_SHELVE',
        payload: data
    }
}

export const setShowFormCreate = () => {
    return {
        type: 'SET_SHOW_FORM_CREATE',
    }
}

export const setShowFormUpdate = (data) => {
    return {
        type: 'SET_SHOW_FORM_UPDATE',
        payload: data,
    }
}

export const setCloseForm = () => {
    return {
        type: 'SET_CLOSE_FORM',
    }
}

export const createShelve = (data) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            await axios.post(`${server}/shelves`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(createShelveSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

const createShelveSuccess = () => {
    return {
        type: 'CREATE_SHELVE_SUCCESS',
    }
}

export const updateShelve = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                areaId: data.areaId,
                boxId: data.boxId,
                totalRack: data.totalRack,
            }
            const token = getTokenFromCookie();
            await axios.put(`${server}/shelves/${data.shelfId}`, value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(updateShelveSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

const updateShelveSuccess = () => {
    return {
        type: 'UPDATE_SHELVE_SUCCESS',
    }
}

export const deleteShelve = (id) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            await axios.delete(`${server}/shelves/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(deleteShelveSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

const deleteShelveSuccess = () => {
    return {
        type: 'DELETE_SHELVE_SUCCESS',
    }
}