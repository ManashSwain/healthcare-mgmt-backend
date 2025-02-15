import express from 'express' ;
import dotenv from "dotenv";
import userRouter from './Routes/user.route.js';
import connectDB from './utils/connectDB.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 5000 ;
app.use(express.json());
connectDB();
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
}));


app.get("/" , (req,res)=>{
    res.status(200).send("Hello world!")
})

app.use("/api" , userRouter);

app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`);
})

