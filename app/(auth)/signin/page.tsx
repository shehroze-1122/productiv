import React from "react"
import AuthForm from "@/components/AuthForm"
import Card from "@/components/common/Card"

const SignIn = () => {
  return (
    <Card className="w-1/2">
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">Welcome Back</h2>
          <p className="tex-lg text-black/25">
            Enter your credentials to access your account
          </p>
        </div>
      </div>
      <AuthForm mode="signin" />
    </Card>
  )
}

export default SignIn
