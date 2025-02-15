import express from 'express' ;
import dotenv from "dotenv";
import userRouter from './Routes/user.route.js';
import connectDB from './utils/connectDB.js';

dotenv.config();
const app = express();
const port = 4000 ;
app.use(express.json());
connectDB();

app.get("/" , (req,res)=>{
    res.status(200).send("Hello world!")
})

app.use("/api" , userRouter);

app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`);
})

