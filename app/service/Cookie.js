export const parseCookies = (req) => {
    let cookies = {};

    const Cookies = req.headers.cookie;
    const cookieArray = Cookies.split(";");
    cookieArray.forEach((item) => {
        const cook = item.split("=");
        cookies[cook[0]] = decodeURIComponent(cook[1]);
    });

    return cookies;
};
