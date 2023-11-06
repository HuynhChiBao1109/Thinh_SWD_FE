import axios from 'axios';
import { server } from '../../shared/contants'
import { getTokenFromCookie } from '../../utilities/cookie.Utility'

export const getListRack = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.get(`${server}/racks`, {
                params: {
                    searchTerm,
                    sortColumn,
                    sortOrder,
                    page,
                    pageSize
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(getListRackSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const getListRackSuccess = (data) => {
    return {
        type: 'GET_LIST_RACK_SUCCESS',
        payload: data
    }
}

export const setShowFormCreate = () => {
    return {
        type: 'SET_SHOW_FORM_CREATE'
    }
}

export const setShowFormEdit = (data) => {
    return {
        type: 'SET_SHOW_FORM_EDIT',
        payload: data
    }
}

export const setCloseForm = () => {
    return {
        type: 'SET_CLOSE_FORM'
    }
}

export const createRack = (data) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.post(`${server}/racks`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(createRackSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const createRackSuccess = (data) => {
    return {
        type: 'CREATE_RACK_SUCCESS',
        payload: data
    }
}

export const updateRack = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                shelfId: data.shelfId,
                totalCell: data.totalCell
            }
            const token = getTokenFromCookie();
            const response = await axios.put(`${server}/racks/${data.rackId}`, value, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(updateRackSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const updateRackSuccess = (data) => {
    return {
        type: 'UPDATE_RACK_SUCCESS',
        payload: data
    }
}

export const deleteRack = (id) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.delete(`${server}/racks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch(deleteRackSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteRackSuccess = (data) => {
    return {
        type: 'DELETE_RACK_SUCCESS',
        payload: data
    }
}