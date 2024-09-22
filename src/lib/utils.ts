import { clsx, type ClassValue } from "clsx"
import mongoose, { mongo } from "mongoose";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const connetToDatabase =  async() => {

  try {
    if(mongoose.connections && mongoose.connections[0].readyState)return;

    const {connection} = await mongoose.connect(
      process.env.MONGO_URI  as string , 
      {
        dbName: "nextAuth"  ,
      }
    )

    console.log(`Conneted to database : ${connection.host}`);
  } catch (error) {
    throw new Error("Error while connecting database");
  }
};

