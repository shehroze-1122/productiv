import React from "react"
import { cookies } from "next/headers"
import { getUserFromCookie } from "@/lib/cookies"
import Button from "@/components/common/Button"
import Card from "@/components/common/Card"
import { delay } from "@/lib/async"

const getData = async () => {
  await delay(5000)
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
        <Button size="large">Today&apos;s Schedule</Button>
      </div>
    </Card>
  )
}

export default Greetings
