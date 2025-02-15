import express from "express" ;
import dotenv from "dotenv";
import userRouter from "./Routes/user.route";
import connectDB from "./utils/connectDB";

dotenv.config();
const app = express();
const port = 4000 ;

app.get("/" , (req,res)=>{
    res.status(200).send("Hello world!")
})

connectDB()

app.use("/api" , userRouter);

app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`);
})

