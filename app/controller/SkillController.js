import skillModel from "../model/SkillModel.js";

export const getSkills = async (req, res, next) => {
    const skills = await skillModel.find({});
    res.status(200).send({
        success: true,
        message: "اطلاعات با موفقیت دریافت شد",
        skills,
    });
};

export const addSkill = async (req, res, next) => {
    const { fa_title, en_title } = req.body;
    const newSkill = new skillModel({
        fa_title,
        en_title,
    });
    await newSkill.save();
    const skills = await skillModel.find({});
    res.status(201).send({
        success: true,
        message: "اطلاعات با موفقیت اضافه شد",
        newSkill,
        skills,
    });
};
