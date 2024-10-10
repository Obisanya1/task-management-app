import Link from "next/link"

export default function HomePage () {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen 
   bg-blue-600 text-white font-serif " >
    <h1 className="text-4xl font-bold">Welcome To The Task Management Application</h1>
    <p className="text-base">This productive tool is designed to help you better manage your tasks more conveniently</p>
    <Link href="/dashboard" className="bg-white text-blue-950 p-5 font-bold rounded-xl ">
      Get Started
    </Link>
    </div>
  )
}