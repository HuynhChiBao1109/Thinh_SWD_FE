const initialState = {
    token: null,
    isChange: false,
};

const authenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload,
                isChange: !state.isChange,
            };

        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isChange: !state.isChange,
            };

        default:
            return state;
    }
};

export default authenReducer;