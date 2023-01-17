import Cookies from "js-cookie";

class WebCookies {
    static SetCookie = (cookieName, userIn) => {
        Cookies.set(cookieName,userIn, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
            path: "/"
        })
    }

    static GetCookie = (cookieName) => {
     return Cookies.get(cookieName);
    }

    static RemoveCookie = (cookieName) => {
        Cookies.remove(cookieName);
       }

}
export default WebCookies;