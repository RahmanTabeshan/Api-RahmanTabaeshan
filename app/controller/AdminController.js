import adminModel from "../model/AdminModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../service/Token.js";


export const registerAdmin = async (req, res, next) => {
    try {
        const { UserName, Password } = req.body;

        const existUser = await adminModel.findOne({ UserName });
        if (existUser) {
            return res.status(400).send({
                error: true,
                message: "نام کاربری از قبل وجود دارد",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(Password, salt);

        const Admin = new adminModel({
            UserName,
            Password: hashPassword,
        });

        const newAdmin = await Admin.save();

        const token = createToken({
            _id: newAdmin._id,
            UserName: newAdmin.UserName,
            Role: newAdmin.Role,
            Status_Code: newAdmin.Status_Code,
            Status: newAdmin.Status,
        });

        res.cookie("AdminToken", token, {
            path: "/",
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "development" ? false  : true ,
            signed : true ,
            domain:process.env.DOMAIN
        });

        res.status(201).send({
            success: true,
            message: "درخواست شما ثبت و در انتظار تایید می باشد",
            newAdmin,
        });
    } catch (error) {
        next(error);
    }
};

export const loginAdmin = async (req, res, next) => {
    let user = await adminModel.findOne({ UserName: req.body.UserName });
    if (!user) {
        return res.status(404).send({
            status: 404,
            error: true,
            message: "نام کاربری یا رمز عبور اشتباه وارد شده است ",
        });
    }
    const validPassword = await bcrypt.compare(
        req.body.Password,
        user.Password
    );
    if (!validPassword) {
        return res.status(404).send({
            status: 404,
            error: true,
            message: "نام کاربری یا رمز عبور اشتباه وارد شده است ",
        });
    }

    user = await adminModel.findOne(
        { UserName: req.body.UserName },
        { Password: 0 }
    );
    
    const token = createToken(user.toObject())

    res.cookie("AdminToken", token , {
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false  : true ,
        signed: true,
        domain: process.env.COOKIE_DOMAIN,
    });

    res.send({
        success: true,
        message: "ورود شما با موفقیت انجام شد",
        user,
    });
}
