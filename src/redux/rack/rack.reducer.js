const initialState = {
    listRack: null,
    totalPage: 0,
    isShowForm: false,
    isChange: false,
    rackUpdate: null,
};

const rackReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST_RACK_SUCCESS':
            return {
                ...state,
                listRack: action.payload.data,
                totalPage: action.payload.totalPages
            };

        case 'SET_SHOW_FORM_CREATE':
            return {
                ...state,
                isShowForm: true,
                rackUpdate: null
            };

        case 'SET_SHOW_FORM_EDIT':
            return {
                ...state,
                isShowForm: true,
                rackUpdate: action.payload
            };

        case 'SET_CLOSE_FORM':
            return {
                ...state,
                isShowForm: false,
                rackUpdate: null
            };

        case 'CREATE_RACK_SUCCESS':
            return {
                ...state,
                isChange: !state.isChange,
                isShowForm: false,
                rackUpdate: null
            };

        case 'UPDATE_RACK_SUCCESS':
            return {
                ...state,
                isChange: !state.isChange,
                isShowForm: false,
                rackUpdate: null
            };

        case 'DELETE_RACK_SUCCESS':
            return {
                ...state,
                isChange: !state.isChange
            };


        default:
            return state;
    }
};

export default rackReducer;