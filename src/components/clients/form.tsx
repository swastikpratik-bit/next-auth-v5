"use client"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { credentialsLogin } from "@/actions/login"
import { useRouter } from "next/navigation"



const LoginFrom = () => { 
    const router = useRouter();
    return (
        <form action={async(formData) => {
            const email = formData.get("email") as string  ; 
            const password = formData.get("password") as string ; 
    
            if(!email || !password){
                toast.error("Please provide all fields");
            }

            const toastId = toast.loading("Logging in");

            const error =  await credentialsLogin(email , password); 

            if(!error){
                toast.success("Login Successfull" , {
                    id : toastId ,
                });
                router.refresh();

            }
            else{
                toast.error(String(error) ,{
                    id : toastId ,
                });
            }


        }} className='flex flex-col gap-4'>
            <Input placeholder='Email' type='email' name='email'/>
            <Input placeholder='Password' type='password' name='password'/>
            <Button type='submit'> Login</Button>
        </form>
    )
}

export { 
    LoginFrom   
}