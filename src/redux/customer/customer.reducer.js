const initialState = {
    listCustomer: null,
    isShowDetail: false,
    customerDetail: null,
    isShowForm: false,
    customerUpdate: null,
    isChange: false
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST_CUSTOMER':
            return {
                ...state,
                listCustomer: action.payload.data
            };

        case 'GET_DETAIL_CUSTOMER':
            return {
                ...state,
                customerDetail: action.payload,
                isShowDetail: true
            };

        case 'CLOSE_DETAIL_CUSTOMER':
            return {
                ...state,
                customerDetail: null,
                isShowDetail: false
            };

        case 'SHOW_FORM_CREATE_CUSTOMER':
            return {
                ...state,
                isShowForm: true,
                customerUpdate: null
            };

        case 'SHOW_FORM_UPDATE_CUSTOMER':
            return {
                ...state,
                isShowForm: true,
                customerUpdate: action.payload
            };

        case 'CLOSE_FORM':
            return {
                ...state,
                isShowForm: false,
                customerUpdate: null
            };

        case 'CREATE_CUSTOMER':
            return {
                ...state,
                isShowForm: false,
                customerUpdate: null,
                isChange: !state.isChange,
                isShowDetail: false
            };

        case 'UPDATE_CUSTOMER':
            return {
                ...state,
                isShowForm: false,
                customerUpdate: null,
                isChange: !state.isChange,
                isShowDetail: false
            };

        case 'DELETE_CUSTOMER':
            return {
                ...state,
                isShowForm: false,
                customerUpdate: null,
                isShowDetail: false,
                isChange: !state.isChange
            };

        default:
            return state;
    }
};

export default customerReducer;