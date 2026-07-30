const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin")
const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
    await mongoose.connect("mongodb+srv://kunalbhajbhuje5_db_user:plqDRO7zenpfzThp@cluster0.wbdnjio.mongodb.net/coursera-app")
    app.listen(3800);
    console.log("Listening on port 3800")   
}

main();
