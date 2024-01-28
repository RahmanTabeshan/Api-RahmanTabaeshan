import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import iconv from "iconv-lite";

import personalModel from "../model/PersonalModel.js";

iconv.skipDecodeWarning = true;

const personalController = {
    getInfo: async (req, res, next) => {
        try {
            const info = await personalModel.find({});
            delete info[0]._doc.profileImage.key;
            res.send({
                message: "اطلاعات با موفقیت دریافت شد ",
                info: { ...info[0]._doc },
            });
        } catch (error) {
            next(error);
        }
    },

    editInfo: async (req, res, next) => {
        const { info } = req.params;
        const { id } = req.body;
        const personInfo = await personalModel.findById(id);
        if (!personInfo) {
            return res.status(401).send({
                success: false,
                message: ".مشکلی پیش آمده . لطفا اطلاعات خود را کنترل و دوباره تلاش کنید",
            });
        }
        if (personInfo._doc.hasOwnProperty(info)) {
            try {
                personInfo[info].value = req.body[info];
                const data = await personInfo.save();
                return res.status(200).send({
                    success: true,
                    message: ".اطلاعات با موفقیت ویرایش شد",
                    info: data,
                });
            } catch (error) {
                return res.status(401).send({
                    success: false,
                    message: ".مشکلی پیش آمده . لطفا اطلاعات ورودی را کنترل و دوباره تلاش کنید",
                });
            }
        }
        next();
    },

    editInfoMulti: async (req, res, next) => {
        const { info, key } = req.params;
        const { id } = req.body;
        const personInfo = await personalModel.findById(id);
        if (!personInfo) {
            return res.status(401).send({
                success: false,
                message: ".مشکلی پیش آمده . لطفا اطلاعات خود را کنترل و دوباره تلاش کنید",
            });
        }
        if (personInfo._doc.hasOwnProperty(info)) {
            if (Array.isArray(personInfo[info])) {
                const selectedInfo = personInfo[info].find((item) => item.title_en === key);
                selectedInfo.value = req.body[`${info}/${key}`];
                try {
                    const data = await personInfo.save();
                    return res.status(200).send({
                        success: true,
                        message: ".اطلاعات با موفقیت ویرایش شد",
                        info: data,
                    });
                } catch (error) {
                    return res.status(401).send({
                        success: false,
                        message: ".مشکلی پیش آمده . لطفا اطلاعات ورودی را کنترل و دوباره تلاش کنید",
                    });
                }
            } else {
                if (personInfo[info].hasOwnProperty(key)) {
                    try {
                        personInfo[info][key] = req.body[`${info}/${key}`];
                        const data = await personInfo.save();
                        return res.status(200).send({
                            success: true,
                            message: ".اطلاعات با موفقیت ویرایش شد",
                            info: data,
                        });
                    } catch (error) {
                        return res.status(401).send({
                            success: false,
                            message:
                                ".مشکلی پیش آمده . لطفا اطلاعات ورودی را کنترل و دوباره تلاش کنید",
                        });
                    }
                } else {
                    next();
                }
            }
        }
        next();
    },

    uploadImage: async (req, res, next) => {
        const client = new S3Client({
            region: "default",
            endpoint: process.env.LIARA_ENDPOINT,
            credentials: {
                accessKeyId: process.env.LIARA_ACCESS_KEY,
                secretAccessKey: process.env.LIARA_SECRET_KEY,
            },
        });

        const { id } = req.body;
        try {
            const personInfo = await personalModel.findById(id);

            const file = req.file;
            if (!file) {
                return res.status(400).send({
                    success: false,
                    message: ".فایل را انتخاب کنید",
                });
            }
            const fileName = iconv.decode(file.originalname, "utf-8");
            const key = `images/${fileName}`;
            const { profileImage } = personInfo;

            if (profileImage.key === key) {
                return res.status(400).send({
                    success: false,
                    message: ".عکس با این نام وجود دارد",
                });
            }

            const deleteParams = {
                Bucket: process.env.LIARA_BUCKET_NAME,
                Key: profileImage.key,
            };

            try {
                await client.send(new DeleteObjectCommand(deleteParams));
                const addParams = {
                    Body: file.buffer,
                    Bucket: process.env.LIARA_BUCKET_NAME,
                    Key: key,
                };
                const command = new PutObjectCommand(addParams);
                try {
                    await client.send(command);
                    profileImage.key = key;
                    profileImage.name = fileName;
                    profileImage.url = `${process.env.CLOUD_HOST}/${key}`;
                    await personInfo.save();
                    res.status(200).send({
                        success: true,
                        message: "فایل با موفقیت آپلود شد",
                        fileUrl: profileImage.url,
                    });
                } catch (error) {
                    console.log(error);
                    res.status(400).send({
                        success: "false",
                        message: ".مشکلی در آپلود پیش آمده دوباره امتحان کنید",
                    });
                }
            } catch (error) {
                next(error);
            }
        } catch (error) {
            return res.status(402).send({
                success: "false",
                message: "اطلاعات وارد شده را بررسی کنید",
            });
        }
    },

    addSocialLink: async (req, res) => {
        const { id, title_fa, title_en, link } = req.body;
        if (!id || !title_fa || !title_en || !link) {
            res.status(400).send({
                success: false,
                status: "Bad Request",
                message: "اطلاعات وارد شده اشتباه می باشد",
            });
        }
        try {
            const personalInfo = await personalModel.findById(id);
            const { socialLink } = personalInfo;
            socialLink.push({
                title_fa,
                title_en,
                value: link,
            });
            try {
                await personalInfo.save();
                res.status(200).send({
                    success: true,
                    message: "لینک جدید با موفقیت افزوده شد.",
                });
            } catch (error) {
                res.status(500).send({
                    message: "مشکلی در سرور پیش آمده است لطفا پس از مدتی دوباره امتحان کنید.",
                });
            }
        } catch (error) {
            res.status(402).send({
                success: false,
                message: "لطفا اطلاعات ارسالی را بررسی و دوباره تلاش کنید.",
            });
        }
    },

    deleteSocialLink : async (req, res, next) => {
        const { deletedId } = req.params;
        const { id } = req.body;
        if (!id || typeof id !== "string") {
            return res.status(404).send({
                success: false,
                message: "اطلاعاتی دریافتی معتبر نیست",
            });
        }
        const personInfo = await personalModel.findById(id);
        if (!personInfo) {
            return next();
        }
        const { socialLink } = personInfo;
        const filterLink = socialLink.filter((item) => item.id !== deletedId);
        personInfo.socialLink = [...filterLink];
        try {
            await personInfo.save();
            return res.status(200).send({
                success: true,
                message: "لینک مورد نظر با موفقیت حذف شد",
            });
        } catch (error) {
            next(error) ;
        }
    }

};
export default personalController;
