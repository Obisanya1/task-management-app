import Link from "next/link"

export default function HomePage () {
  return (
    <div >
    <h1>Home Page</h1>
    <h3>Welcome To The Task Management Application</h3>
    <p>This productive tool is designed to help you better manage your tasks more conveniently</p>
    <Link href="/dashboard">
      Get Started
    </Link>
    </div>
  )
}