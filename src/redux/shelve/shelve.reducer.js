const initialState = {
    listShelve: null,
    totalPage: 0,
    isShowForm: false,
    shelveUpdate: null,
    isChange: false,
};

const shelveAreaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LIST_SHELVE":
            return {
                ...state,
                listShelve: action.payload.data,
                totalPage: action.payload.totalPages,
            };

        case "SET_SHOW_FORM_CREATE":
            return {
                ...state,
                isShowForm: true,
                shelveUpdate: null,
            };

        case "SET_CLOSE_FORM":
            return {
                ...state,
                isShowForm: false,
                shelveUpdate: null,
            };

        case "SET_SHOW_FORM_UPDATE":
            return {
                ...state,
                isShowForm: true,
                shelveUpdate: action.payload,
            };

        case "CREATE_SHELVE_SUCCESS":
            return {
                ...state,
                isShowForm: false,
                isChange: !state.isChange,
            };

        case "UPDATE_SHELVE_SUCCESS":
            return {
                ...state,
                isShowForm: false,
                isChange: !state.isChange,
            };

        case "DELETE_SHELVE_SUCCESS":
            return {
                ...state,
                isShowForm: false,
                isChange: !state.isChange,
            };

        default:
            return state;
    }
};

export default shelveAreaReducer;