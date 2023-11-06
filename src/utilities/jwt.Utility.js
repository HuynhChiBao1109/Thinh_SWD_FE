import jwtDecode from "jwt-decode";

export const decodeToken = (token) => {
    try {
        const jwtData = jwtDecode(token);
        const email = jwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const role = jwtData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const id = jwtData['Id']
        return {
            id,
            email,
            role
        }
    } catch (error) {
        return null;
    }
}