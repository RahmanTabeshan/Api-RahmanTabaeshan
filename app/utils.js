import adminModel from "./model/AdminModel.js";

export const existMobile = async (req) => {
    const { Mobile } = req.body;
    const orginalMobile = Number(`98${Number(Mobile)}`);
    const existMobile = await adminModel.findOne({
        Mobile: orginalMobile,
    });
    if (existMobile) {
        return true;
    }
    return false;
};

export const existUser = async (req) => {
    const { Email: UserName } = req.body;
    const existUser = await adminModel.findOne({ UserName });
    if (existUser) {
        return true;
    }
    return false;
};
