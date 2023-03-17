"use client"
import React, { useState } from "react"
import { LogOut } from "react-feather"
import { logout } from "@/lib/api"
import Button from "../common/Button"
import { useRouter } from "next/navigation"

const SignOutButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      await logout()
      router.replace("/signin")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button
      intent="primary"
      size="medium"
      onClick={handleClick}
      className="flex justify-center items-center"
      disabled={loading}
    >
      <LogOut className="inline mr-2" /> Logout
    </Button>
  )
}

export default SignOutButton
