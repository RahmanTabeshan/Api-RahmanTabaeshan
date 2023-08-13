import { parseCookies } from "../service/Cookie.js";
import cookieParser from "cookie-parser";
import { verifyToken } from "../service/Token.js";

export const authAdminToken = async (req, res, next) => {
    if (!req.headers.cookie) {
        return res.send({
            error: true,
            message: "توکن وجود ندارد",
        });
    }
    const cookies = parseCookies(req);

    if (!cookies.AdminToken) {
        return res.send({
            error: true,
            message: "توکن وجود ندارد",
        });
    }

    const token = cookieParser.signedCookie(
        cookies.AdminToken,
        process.env.COOKIE_SECRET_CODE
    );

    const verify = verifyToken(token);

    if (!verify) {
        return res.send({
            error: true,
            message: "توکن معتبر نیست",
        });
    }

    res.send({
        success: true,
        messgae: "کاربر با موفقیت دریافت شد",
        user: verify,
    });
};
