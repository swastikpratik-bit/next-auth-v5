import { compare } from "bcryptjs";
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connetToDatabase } from "./lib/utils";
import { User } from "./models/userModel";

export const {handlers , signIn , signOut , auth}  = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        }) , 
        CredentialProvider({
            name : "Credentials" , 
            credentials : {
                email : {
                    label : "Email" , 
                    type : "email" 
                },
                password : {
                    label : "Password" , 
                    type : "password"   
                },
            } , 
            authorize : async(credentials) => { 
                const email = credentials.email as string | undefined ; 
                const password = credentials.password as string | undefined ; 

                if(!email || !password ){
                    throw new CredentialsSignin("Please provide both fields");
                }

                await connetToDatabase();

                const user = await User.findOne({email}).select("+password");

                if(!user){
                    throw new CredentialsSignin({ cause  : "Invalid User or password"});
                }
                if(!user.password){
                    throw new CredentialsSignin({ cause  : "Invalid User or password"});
                }

                const isMatch = await compare(password , user.password);      

                if(!isMatch){
                    throw new CredentialsSignin({ cause  : "Invalid User or password"});
                }
                
                user.password = null;
                return user;
                
            }   
        })
    ] ,
    pages : {
        signIn : "/login" ,
    }, 
    callbacks : { 
        //@ts-ignore
        signIn: async ({user , account}) => {
            if(account?.provider ==="google"){
                try {
                    const {email , name , image , id} = user 
                    await connetToDatabase() ;
                    const alreadyUser = await User.findOne({email});

                    if(!alreadyUser){
                        await User.create({
                            email , 
                            name , 
                            image , 
                            googleId : id
                        })
                    }
                    return true ;
                } catch (error) {
                    throw new AuthError("Error while creating user");
                }
            }
            if(account?.provider ==="credentials")return true;
        },
    }
});




