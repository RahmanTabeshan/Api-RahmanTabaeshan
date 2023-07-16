import { app } from "../app.js";

const NotFound = () => {
    app.use((req, res) => {
        res.status(404).send({
            status: 404,
            message: "صفحه مورد نظر یافت نشد",
            Code: "Not Found",
        });
    });
};

export default NotFound;
