import { Button } from "@/components/ui/button"
import { LoginFrom } from '@/components/clients/form'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import Link from 'next/link'
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"
  

const Page = async() => {

    const session = await auth();
    if(session?.user){
        redirect("/");
    }
 
    return (
        <div className='flex justify-center items-center h-dvh'>
            <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
            <LoginFrom/>
        </CardContent>
        <CardFooter className='flex flex-col gap-4' >
            <span>Or</span>
            <form action={async() => {
                "use server"
                await signIn('google')
            }}>
                <Button type='submit' variant={'outline'}> Login With Google</Button>
            </form>
            <Link href={'/signup'}>
                Don't have an account ? Signup
            </Link>
        </CardFooter>
        </Card>

        </div>
  )
}

export default Page
