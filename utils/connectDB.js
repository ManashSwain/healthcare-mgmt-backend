import mongoose from "mongoose";

mongoose.connection.on("connected" , ()=>{
    console.log("Connected to mongoDB  Database")
});

mongoose.connection.on("disconnected" , ()=>{
    console.log("Disconnected from mongoDB Database!")
})

const connectDB = async ()=>{
    try{  
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
    }
    catch(err){
        console.error("Error while connecting to database : " , err);
        process.exit(1);
    }
}

export default connectDB;