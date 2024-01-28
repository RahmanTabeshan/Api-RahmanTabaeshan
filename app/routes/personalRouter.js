import express from "express";
import multer from "multer";
import AuthCookie from "../middleware/AuthCookie.js";
import personalController from "../controller/PersonInfoController.js";
import personalModel, { personalSchema } from "../model/PersonalModel.js";
import mongoose from "mongoose";

const personalRouter = express.Router();
const upload = multer();

personalRouter.get("/", personalController.getInfo);

personalRouter.post("/", async (req, res) => {
    // const info = new personalModel({
    //     Name: {
    //         fa: "رحمان تابشان",
    //         en: "Rahman Tabeshan",
    //     },
    //     socialLink: [{ title_en: "Telegram", title_fa: "تلگرام", value: "12321321321" }],
    //     profileImage: {
    //         key: "123222",
    //         name: "hgjfk",
    //         url: "756859",
    //     },
    //     phone: {
    //         value: "97879789",
    //     },
    //     numProject: {
    //         value: 4,
    //     },
    //     condition: {
    //         value: "34343434",
    //     },
    // });
    // info.save();
    // const client = new S3Client({
    //     region: "default",
    //     endpoint: process.env.LIARA_ENDPOINT,
    //     credentials: {
    //         accessKeyId: process.env.LIARA_ACCESS_KEY,
    //         secretAccessKey: process.env.LIARA_SECRET_KEY,
    //     },
    // });
    // const file = req.file;
    // const fileName = iconv.decode(file.originalname, "utf-8");
    // const key = `images/${fileName}`;
    // const params = {
    //     Body: file.buffer,
    //     Bucket: process.env.LIARA_BUCKET_NAME,
    //     Key: key,
    // };
    // const command = new PutObjectCommand(params);
    // try {
    //     const data = await client.send(command);
    //     const urlParams = {
    //         Bucket: process.env.LIARA_BUCKET_NAME,
    //         Key: key,
    //     };
    //     const urlCommand = new GetObjectCommand(params);
    //     try {
    //         const url = await getSignedUrl(client, urlCommand);
    //         console.log(url);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
});

personalRouter.patch("/edit/:info", AuthCookie, personalController.editInfo);

personalRouter.patch("/edit/:info/:key", AuthCookie, personalController.editInfoMulti);

personalRouter.post(
    "/upload/image",
    [AuthCookie, upload.single("profileImage")],
    personalController.uploadImage
);

personalRouter.post("/edit/addsociallink", AuthCookie, personalController.addSocialLink);

personalRouter.delete(
    "/edit/deletesociallink/:deletedId",
    AuthCookie,
    personalController.deleteSocialLink
);

personalRouter.post("/edit/addinfo", async (req, res, next) => {});

export default personalRouter;
