import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Link from 'next/link'
import {hash} from 'bcryptjs'
import { User } from "@/models/userModel"
import { redirect } from "next/navigation"
import { connetToDatabase } from "@/lib/utils"

  

const Page = () => {

    const signUp = async(formdata : FormData) => {
        'use server' ;
        const name = formdata.get("name") as string | undefined ; 
        const email = formdata.get("email") as string | undefined ; 
        const password = formdata.get("password") as string | undefined ; 

        if(!name || !email || !password){
            throw new Error("Please provide all fields");
        }

        await connetToDatabase();


        const user = await User.findOne({ email});

        if(user){
            throw new Error("User already exists");
        }

        const hashedPassword = await hash(password , 10);

        await User.create({
            name , 
            email , 
            password : hashedPassword,
        }) ;

        redirect("/login");   
    }

  return (
    <div className='flex justify-center items-center h-dvh'>
        <Card>
    <CardHeader>
        <CardTitle>Sign Up</CardTitle>
    </CardHeader>
    <CardContent>
        <form action={signUp} className='flex flex-col gap-4'>
            <Input placeholder='Name' name="name"/>
            <Input placeholder='Email' type='email' name="email"/>
            <Input placeholder='Password' type='password' name="password"/>
            <Button type='submit'> Sign  Up</Button>
        </form>
    </CardContent>
    <CardFooter className='flex flex-col gap-4' >
        <span>Or</span>
        <form action="">
            <Button type='submit' variant={'outline'}> Login With Google</Button>
        </form>

        <Link href='/login' >
          Already have an account ? Login
        </Link>
    </CardFooter>
    </Card>

    </div>
  )
}

export default Page
