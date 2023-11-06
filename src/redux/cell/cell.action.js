import axios from "axios";
import { server } from '../../shared/contants';
import { getTokenFromCookie } from '../../utilities/cookie.Utility';

export const getListCell = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.get(
                `${server}/cells`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        searchTerm: searchTerm,
                        sortColumn: sortColumn,
                        sortOrder: sortOrder,
                        page: page,
                        pageSize: pageSize
                    }
                }
            );
            dispatch(getListCellSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const getListCellSuccess = (data) => ({
    type: 'GET_LIST_CELL_SUCCESS',
    payload: data
})

export const setShowFormCreate = () => {
    return {
        type: 'SET_SHOW_FORM_CREATE'
    }
}

export const setShowFormUpdate = (data) => {
    return {
        type: 'SET_SHOW_FORM_UPDATE',
        payload: data
    }
}

export const setCloseForm = () => {
    return {
        type: 'SET_CLOSE_FORM'
    }
}

export const createCell = (data) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.post(
                `${server}/cells`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(createCellSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const createCellSuccess = (data) => ({
    type: 'CREATE_CELL_SUCCESS',
    payload: data
})

export const updateCell = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                rackId: data.rackId
            }
            const token = getTokenFromCookie();
            const response = await axios.put(
                `${server}/cells/${data.cellId}}`,
                value,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(updateCellSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const updateCellSuccess = (data) => ({
    type: 'UPDATE_CELL_SUCCESS',
    payload: data
})

export const deleteCell = (id) => {
    return async (dispatch) => {
        try {
            const token = getTokenFromCookie();
            const response = await axios.delete(
                `${server}/cells/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            dispatch(deleteCellSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteCellSuccess = (data) => ({
    type: 'DELETE_CELL_SUCCESS',
    payload: data
})

