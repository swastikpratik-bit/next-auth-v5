import { auth } from "@/auth";

export default async function Home() {

  const session = await auth();

  return (
   <div className="flex justify-center items-center h-screen w-screen flex-col gap-3">    
      <div className="uppercase font-bold text-3xl">hii there</div>
   </div>
  );
}
