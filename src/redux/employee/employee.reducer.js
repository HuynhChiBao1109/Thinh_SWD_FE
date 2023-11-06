const initialState = {
    listEmployee: null,
    totalPage: 0,
    employeeDetail: null,
    isShowDetail: false,
    isShowForm: false,
    employeeUpdate: null,
    isChange: false
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST_EMPLOYEE':
            return {
                ...state,
                listEmployee: action.payload.data,
                totalPage: action.payload.totalPages
            };

        case 'GET_EMPLOYEE_DETAIL':
            return {
                ...state,
                employeeDetail: action.payload.data,
                isShowDetail: true
            };

        case 'CLOSE_DETAIL':
            return {
                ...state,
                employeeDetail: null,
                isShowDetail: false
            };

        case 'SHOW_FORM_CREATE':
            return {
                ...state,
                isShowForm: true,
                employeeUpdate: null
            };

        case 'SHOW_FORM_UPDATE':
            return {
                ...state,
                isShowForm: true,
                employeeUpdate: action.payload
            };

        case 'CLOSE_FORM':
            return {
                ...state,
                isShowForm: false,
                employeeUpdate: null
            };

        case 'CREATE_NEW_EMPLOYEE':
            return {
                ...state,
                isShowForm: false,
                employeeUpdate: null,
                isChange: !state.isChange
            };

        case 'UPDATE_EMPLOYEE':
            return {
                ...state,
                isShowForm: false,
                employeeUpdate: null,
                isChange: !state.isChange
            };

        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                isShowDetail: false,
                isChange: !state.isChange
            };

        default:
            return state;
    }
};

export default employeeReducer;