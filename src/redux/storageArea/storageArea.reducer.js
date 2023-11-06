const initialState = {
    listStorageArea: null,
    totalPage: 0,
    isShowForm: false,
    storageAreaUpdate: null,
    isChange: false,
};

const storageAreaReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LIST_STORAGE_AREA":
            return {
                ...state,
                listStorageArea: action.payload.data,
                totalPage: action.payload.totalPages,
            };

        case "SET_SHOW_FORM_CREATE":
            return {
                ...state,
                isShowForm: true,
                storageAreaUpdate: null,
            };

        case "SET_CLOSE_FORM":
            return {
                ...state,
                isShowForm: false,
                storageAreaUpdate: null,
            };

        case "SET_SHOW_FORM_UPDATE":
            return {
                ...state,
                isShowForm: true,
                storageAreaUpdate: action.payload,
            };

        case "CREATE_STORAGE_AREA":
            return {
                ...state,
                isShowForm: false,
                isChange: !state.isChange,
            };

        case "UPDATE_STORAGE_AREA":
            return {
                ...state,
                isShowForm: false,
                isChange: !state.isChange,
            };

        case "DELETE_STORAGE_AREA":
            return {
                ...state,
                isShowForm: false,
                isChange: !state.isChange,
            };

        default:
            return state;
    }
};

export default storageAreaReducer;