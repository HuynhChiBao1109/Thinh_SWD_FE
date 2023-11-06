const initialState = {
    listStore: [],
    totalPage: 0,
    isShowDetail: false,
    storeDetail: null,
    isShowForm: false,
    storeUpdate: null,
    isChange: false
};

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST_STORE':
            return {
                ...state,
                listStore: action.payload.data,
                totalPage: action.payload.totalPages
            };

        case 'SET_SHOW_DETAIL_STORE':
            return {
                ...state,
                isShowDetail: true,
                storeDetail: action.payload.data
            }

        case 'SET_CLOSE_DETAIL_STORE':
            return {
                ...state,
                isShowDetail: false,
                storeDetail: null
            }

        case 'SET_SHOW_FORM_CREATE_STORE':
            return {
                ...state,
                isShowForm: true
            }

        case 'SET_CLOSE_FORM_CREATE_STORE':
            return {
                ...state,
                isShowForm: false,
                storeUpdate: null
            }

        case 'SET_SHOW_FORM_UPDATE_STORE':
            return {
                ...state,
                isShowForm: true,
                storeUpdate: action.payload
            }

        case 'CREATE_NEW_STORE':
            return {
                ...state,
                isShowForm: false,
                storeUpdate: null,
                isChange: !state.isChange
            }

        case 'UPDATE_STORE':
            return {
                ...state,
                isShowForm: false,
                storeUpdate: null,
                isChange: !state.isChange,
                isShowDetail: false,
            }

        case 'DELETE_STORE':
            return {
                ...state,
                isShowDetail: false,
                storeDetail: null,
                isChange: !state.isChange,
            }

        default:
            return state;
    }
};

export default storeReducer;