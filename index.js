import express from "express";
import mongoose from "mongoose";
import postRouter from "./router.js";

const PORT = 9000;
const URL_BD = "mongodb+srv://user:user@cluster0.emwpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());
app.use("/api", postRouter);

async function startApp() {
  try {
    await mongoose.connect(URL_BD);
    app.listen(PORT, () => console.log("server working"));
  } catch (error) {
    console.log("Error with start app", error);
  }
}

startApp();
