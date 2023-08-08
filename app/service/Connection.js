import mongoose from "mongoose";

mongoose.connection.on("error", (err) => {
    console.log("database Connection Lost");
});

const dbConnect = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kpwzoai.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
};

export default dbConnect;
