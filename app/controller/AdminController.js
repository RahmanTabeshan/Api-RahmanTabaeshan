import adminModel from "../model/AdminModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../service/Token.js";
import { existMobile, existUser } from "../utils.js";

export const registerAdmin = async (req, res, next) => {
    try {
        const { Email: UserName, Password, Name, Mobile } = req.body;

        if (await existUser(req)) {
            return res.status(400).send({
                error: true,
                message: "نام کاربری از قبل وجود دارد",
            });
        }

        if( await existMobile(req)){
            return res.status(400).send({
                error: true,
                message: "کاربر با این شماره موبایل وجود دارد",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(Password, salt);

        const Admin = new adminModel({
            Name,
            UserName,
            Mobile: parseFloat(`98${Number(Mobile)}`),
            Password: hashPassword,
        });

        const newAdmin = await Admin.save();

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

    const token = createToken(user.toObject());

    res.cookie("AdminToken", token, {
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        signed: true,
        domain:
            process.env.NODE_ENV === "development"
                ? "localhost"
                : ".rahmantabeshan.ir",
    }).send({
        success: true,
        message: "ورود شما با موفقیت انجام شد",
        user,
    });
};

export const checkExist = async (req, res, next) => {
    const { type } = req.body;
    switch (type.toLowerCase()) {
        case "email": {
            if (await existUser(req)) {
                return res.status(400).send({
                    error: true,
                    message: "نام کاربری از قبل وجود دارد",
                });
            }
            return res.status(200).send({
                success: true,
            });
        }
        case "mobile": {
            if (await existMobile(req)) {
                return res.status(400).send({
                    error: true,
                    message: "کاربر با این شماره موبایل وجود دارد",
                });
            }
            return res.status(200).send({
                success: true,
            });
        }
    }
};
