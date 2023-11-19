import cookieParser from "cookie-parser";
import { parseCookies } from "../service/Cookie.js";
import { verifyToken } from "../service/Token.js";

const AuthCookie = (req , res , next) => {
    const cookie = req.headers.cookie ;
    if(!cookie){
        return res.status(401).send({
            message : "لطفا ابتدا وارد حساب کاربری خود شوید"
        })
    }
    const cookies = parseCookies(req) ;
    if(!cookies.AdminToken){
        return res.status(401).send({
            message : "دسترسی شما به این قسمت غیر مجاز است"
        })
    } 

    const token = cookieParser.signedCookie(
        cookies.AdminToken,
        process.env.COOKIE_SECRET_CODE
    );

    const verify = verifyToken(token);

    if (!verify) {
        return res.status(401).send({
            message : "دسترسی شما به این قسمت غیر مجاز است"
        })
    }

    next() ;

}
 
export default AuthCookie;