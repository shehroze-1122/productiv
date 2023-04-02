import React from "react"
import AuthForm from "@/components/AuthForm"
import Card from "@/components/common/Card"

const Register = () => {
  return (
    <Card className="min-w-1/3 px-10 py-2">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">Create a new account</h2>
          <p className="tex-lg text-black/25">
            Just a few things to get started
          </p>
        </div>
      </div>
      <AuthForm mode="register" />
    </Card>
  )
}

export default Register
