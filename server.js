import express from express ;
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 4000 ;

app.get("/" , (req,res)=>{
    res.status(200).send("Hello world!")
})

app.listen(port , ()=>{
    console.log(`App is listening on port ${port}`);
})

