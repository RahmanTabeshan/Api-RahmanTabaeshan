import { app } from "../app.js";

const Exeption = () => {
    app.use((error, req, res, next) => {
        const status = error.status || 500;
        console.log(error);
        return res.status(500).send({
            Code: "Exeption",
            status,
            message: "خطایی رخ داده است",
        });
    });
};

export default Exeption;
