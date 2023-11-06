import axios from "axios";
import { server } from "../../shared/contants";
import { getTokenFromCookie } from '../../utilities/cookie.Utility';
import { getTime } from "../../utilities/time.Utility";

export const getListCutomer = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            if (!getTokenFromCookie()) throw new Error('Token is null');

            const response = await axios.get(`${server}/customers`, {
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                },
                params: {
                    searchTerm,
                    sortColumn,
                    sortOrder,
                    page,
                    pageSize
                }
            });
            dispatch(getListCutomerSuccess(response.data));
        } catch (error) {
            throw error;
        }
    }
}

const getListCutomerSuccess = (data) => {
    return {
        type: 'GET_LIST_CUSTOMER',
        payload: data
    }
}

export const getDetailCustomerById = (id) => {
    return async (dispatch) => {
        try {
            if (!getTokenFromCookie()) throw new Error('Token is null');

            const response = await axios.get(`${server}/customers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(getDetailCustomerByIdSuccess(response.data));
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const getDetailCustomerByIdSuccess = (data) => {
    return {
        type: 'GET_DETAIL_CUSTOMER',
        payload: data
    }
}

export const setCloseDetail = () => {
    return {
        type: 'CLOSE_DETAIL_CUSTOMER'
    }
}

export const setShowFormCreate = () => {
    return {
        type: 'SHOW_FORM_CREATE_CUSTOMER'
    }
}

export const setShowFormUpdate = (data) => {
    return {
        type: 'SHOW_FORM_UPDATE_CUSTOMER',
        payload: data
    }
}

export const setCloseForm = () => {
    return {
        type: 'CLOSE_FORM'
    }
}

export const createCustomer = (data) => {
    return async (dispatch) => {
        try {
            if (!getTokenFromCookie()) throw new Error('Token is null');

            const response = await axios.post(`${server}/customers`, data, {
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                }
            });
            dispatch(createCustomerSuccess(response.data));
        } catch (error) {
            throw error;
        }
    }
}

const createCustomerSuccess = (data) => {
    return {
        type: 'CREATE_CUSTOMER',
        payload: data
    }
}

export const updateCustomer = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                customerName: data.customerName,
                email: data.email,
                accPassword: data.accPassword,
                phone: data.phone,
                dateOfBirth: getTime(data.dateOfBirth),
                gender: data.gender,
            }
            if (!getTokenFromCookie()) throw new Error('Token is null');

            const response = await axios.put(`${server}/customers/${data.customerId}`, value, {
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                }
            });
            dispatch(updateCustomerSuccess(response.data));
        } catch (error) {
            throw error;
        }
    }
}

const updateCustomerSuccess = (data) => {
    return {
        type: 'UPDATE_CUSTOMER',
        payload: data
    }
}

export const deleteCustomer = (id) => {
    return async (dispatch) => {
        try {
            if (!getTokenFromCookie()) throw new Error('Token is null');

            await axios.delete(`${server}/customers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getTokenFromCookie()}`
                }
            });
            dispatch(deleteCustomerSuccess(id));
        } catch (error) {
            throw error;
        }
    }
}

const deleteCustomerSuccess = (id) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: id
    }
}