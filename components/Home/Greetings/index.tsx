import React from "react"
import { getUserFromCookie } from "@/lib/cookies"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import Link from "next/link"

const getData = async () => {
  const user = await getUserFromCookie()
  return user
}

const Greetings = async () => {
  const user = await getData()

  if (!user) return null

  return (
    <Card className="w-full relative px-6 py-4">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user.firstName}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Link
          className="bg-violet-500 text-white border-transparent hover:bg-violet-600 text-lg px-6 py-3 rounded-3xl font-bold hover:scale-110 active:scale-100 transition duration-200 ease-in-out"
          href="/calendar"
        >
          Today&apos;s Schedule
        </Link>
      </div>
    </Card>
  )
}

export default Greetings
