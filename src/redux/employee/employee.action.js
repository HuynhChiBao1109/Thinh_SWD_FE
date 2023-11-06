import axios from "axios";
import { server } from "../../shared/contants";
import { getTokenFromCookie } from "../../utilities/cookie.Utility";

export const getListEmployee = (searchTerm, sortColumn, sortOrder, page, pageSize) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/employees`, {
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
            dispatch(getListEmployeeSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const getListEmployeeSuccess = (data) => {
    return {
        type: 'GET_LIST_EMPLOYEE',
        payload: data
    }
}

export const getEmployeeDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${server}/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(getEmployeeDetailSuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    }
}

const getEmployeeDetailSuccess = (data) => {
    return {
        type: 'GET_EMPLOYEE_DETAIL',
        payload: data
    }
}

export const setClostDetail = () => {
    return {
        type: 'CLOSE_DETAIL'
    }
}

export const setShowFormCreate = () => {
    return {
        type: 'SHOW_FORM_CREATE'
    }
}

export const setShowFormUpdate = (data) => {
    return {
        type: 'SHOW_FORM_UPDATE',
        payload: data
    }
}

export const setCloseForm = () => {
    return {
        type: 'CLOSE_FORM'
    }
}

export const createNewEmployee = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(`${server}/employees`, data, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(createNewEmployeeSuccess());
        } catch (error) {
            throw error;
        }
    }
}

const createNewEmployeeSuccess = () => {
    return {
        type: 'CREATE_NEW_EMPLOYEE',
    }
}

export const updateEmployee = (data) => {
    return async (dispatch) => {
        try {
            const value = {
                employeeName: data.employeeName,
                email: data.email,
                accPassword: data.accPassword,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
                gender: data.gender
            }

            await axios.put(`${server}/employees/${data.employeeId}`, data, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(updateEmployeeSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const updateEmployeeSuccess = () => {
    return {
        type: 'UPDATE_EMPLOYEE',
    }
}

export const deleteEmployee = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${server}/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${getTokenFromCookie()}`
                }
            })
            dispatch(deleteEmployeeSuccess());
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const deleteEmployeeSuccess = () => {
    return {
        type: 'DELETE_EMPLOYEE',
    }
}