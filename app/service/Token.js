import jwt from "jsonwebtoken";

export const createToken = (data) => {
    return jwt.sign(data, process.env.APP_SECRET);
};

export const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.APP_SECRET);
        return data;
    } catch (error) {
        return false;
    }
};

export const decodeToken = (token) => {
    return jwt.decode(token, process.env.APP_SECRET);
};
