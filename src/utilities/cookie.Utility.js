import Cookies from "js-cookie";

export const saveTokenToCookie = (token) => {
    try {
        Cookies.set(
            'user',
            token,
            {
                expires: 1
            }
        );
    } catch (error) {
        console.log(error);
    }
}

export const getTokenFromCookie = () => {
    try {
        const token = Cookies.get('user');
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const removeTokenFromCookie = () => {
    try {
        Cookies.remove('user');
    } catch (error) {
        console.log(error);
    }
}