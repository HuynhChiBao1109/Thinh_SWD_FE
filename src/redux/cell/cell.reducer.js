const initialState = {
    listCell: null,
    totalPage: 1,
    isShowForm: false,
    cellUpdate: null,
    isChange: false
};

const cellReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST_CELL_SUCCESS':
            return {
                ...state,
                listCell: action.payload.data,
                totalPage: action.payload.totalPages
            }

        case 'SET_SHOW_FORM_CREATE':
            return {
                ...state,
                isShowForm: true,
                cellUpdate: null
            }

        case 'SET_CLOSE_FORM':
            return {
                ...state,
                isShowForm: false,
                cellUpdate: null
            }

        case 'SET_SHOW_FORM_UPDATE':
            return {
                ...state,
                isShowForm: true,
                cellUpdate: action.payload
            }

        case 'CREATE_CELL_SUCCESS':
            return {
                ...state,
                isShowForm: false,
                cellUpdate: null,
                isChange: !state.isChange
            }

        case 'UPDATE_CELL_SUCCESS':
            return {
                ...state,
                isShowForm: false,
                cellUpdate: null,
                isChange: !state.isChange
            }

        case 'DELETE_CELL_SUCCESS':
            return {
                ...state,
                isChange: !state.isChange
            }

        default:
            return state;
    }
};

export default cellReducer;