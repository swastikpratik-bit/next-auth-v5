import mongoose, { mongo, Mongoose } from "mongoose"; 

const userSchema = new mongoose.Schema({
    name : { 
        type: String , 
        required : true , 
    },
    email : { 
        type: String , 
        required : true , 
        unique : true  , 
    },
    image : {
        type :String , 

    },
    password : { 
        type: String , 
        select : false , 
    },
    googleId :{ 
        type : String ,  
    }
});

export const User  =  mongoose.models?.User ||  mongoose.model("User" , userSchema);

