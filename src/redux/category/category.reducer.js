const initialState = {
    listCategory: null,
    isShowDetail: false,
    detailCategory: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_LIST_CATEGORY':
            return {
                ...state,
                listCategory: action.payload.data,
            };

        case 'GET_CATEGORY_BY_ID':
            return {
                ...state,
                detailCategory: action.payload.data,
                isShowDetail: true
            };

        case 'CLOSE_DETAIL_CATEGORY':
            return {
                ...state,
                isShowDetail: false,
                detailCategory: null
            };

        default:
            return state;
    }
};

export default categoryReducer;