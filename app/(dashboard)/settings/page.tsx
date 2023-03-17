import React from "react"
import AccountSettings from "@/components/Home/Settings/AccountSettings"
import { getUserFromCookie } from "@/lib/cookies"

const Settings = async () => {
  const user = await getUserFromCookie()

  if (!user) return

  return (
    <AccountSettings
      user={{
        ...user,
        createdAt: user.createdAt.toDateString(),
        updatedAt: user.updatedAt.toDateString()
      }}
    />
  )
}

export default Settings
