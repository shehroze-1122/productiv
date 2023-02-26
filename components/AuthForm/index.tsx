"use client"
import React, { ChangeEvent, FC, FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import { register, signin } from "@/lib/api"
import { commonFields, configMap } from "./constants"

type AuthForm = {
  mode: "signin" | "register"
}
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
}
const AuthForm: FC<AuthForm> = ({ mode }) => {
  const config = configMap[mode]

  const router = useRouter()
  const [state, setState] = useState<typeof initialState>(initialState)
  console.log({ state })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (mode === "register") {
        await register(state)
      } else {
        await signin(state)
      }

      router.replace("/home")
    } catch (e) {
      console.log(e)
    } finally {
      setState(initialState)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="py-4 w-full">
      {mode === "register" && (
        <div className="flex mb-4 justify-between">
          <div className="pr-2">
            <div className="text-lg mb-4 ml-2 text-black/50">First Name</div>
            <Input
              required
              placeholder="First Name"
              value={state.firstName}
              onChange={(e) =>
                setState((s) => ({ ...s, firstName: e.target.value }))
              }
            />
          </div>
          <div className="pl-2 w-50">
            <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
            <Input
              required
              placeholder="Last Name"
              value={state.lastName}
              onChange={(e) =>
                setState((s) => ({ ...s, lastName: e.target.value }))
              }
            />
          </div>
        </div>
      )}
      {commonFields.map((field, i) => (
        <div className="mb-4" key={i}>
          <div className="text-lg mb-4 ml-2 text-black/50">{field.label}</div>
          <Input
            required={field.required}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={state[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <div>
          <Button type="submit" intent="secondary">
            {config.buttonText}
          </Button>
        </div>
        <div className="mt-2">
          <span className="text-sm">{config.alternateCaseText}</span>
          <Link href={config.linkUrl} className="text-blue-600 font-bold ml-1">
            {config.linkText}
          </Link>
        </div>
      </div>
    </form>
  )
}

export default AuthForm
