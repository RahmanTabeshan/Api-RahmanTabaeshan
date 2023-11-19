import mongoose from "mongoose";

export const personalSchema = new mongoose.Schema({
    Name: {
        title : {type:String , default:"نام"},
        fa: { type: String, required: true },
        en: { type: String, required: true },
    },
    profileImage: {
        name: { type: String, required: true },
        url: { type: String, required: true },
        key: { type: String, required: true },
    },
    socialLink: [
        {
            parentTitle: { type: String, default: "لینک شبکه‌های اجتماعی" },
            title_fa: { type: String, required: true },
            title_en: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    phone: {
        title: { type: String, default: "شماره همراه" },
        value: { type: String, required: true },
    },
    numProject: {
        title: { type: String, default: "تعداد پروژه" },
        value: { type: Number, required: true },
    },
    condition: {
        title: { type: String, default: "وضعیت" },
        value: { type: String, required: true },
    },
});

const personalModel = mongoose.model("personalInfo", personalSchema);

export default personalModel;
