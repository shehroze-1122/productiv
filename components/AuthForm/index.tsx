"use client"
import React, { ChangeEvent, FC, FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import { register, signin } from "@/lib/api"
import { commonFields, configMap } from "./constants"
import PasswordValidation from "./PasswordValidation"
import { validatePassword } from "@/lib/password"

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
  const [authError, setAuthError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      let error
      if (mode === "register") {
        const response = await register(state)
        error = response.error
      } else {
        const response = await signin(state)
        error = response.error
      }

      if (!error) {
        setAuthError(null)
        setState(initialState)
        return router.replace("/home")
      }
      setAuthError(error)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit} className="py-4 w-full">
      {mode === "register" && (
        <div className="flex mb-2 justify-between">
          <div className="pr-2">
            <div className="text-lg mb-1 ml-2 text-black/50">First Name</div>
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
            <div className="text-lg mb-1 ml-2 text-black/50">Last Name</div>
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
        <div className="mb-2" key={i}>
          <div className="text-lg mb-1 ml-2 text-black/50">{field.label}</div>
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
      {mode === "register" && state.password && (
        <PasswordValidation password={state.password} />
      )}
      {authError && <div className="text-red-700 mt-2">{authError}</div>}
      <div className="w-full flex flex-col sm:flex-row justify-between mt-3">
        <div>
          <Button
            type="submit"
            intent="secondary"
            disabled={
              loading ||
              (mode === "register" &&
                state.password !== "" &&
                !validatePassword("ALL", state.password))
            }
          >
            {loading ? "Loading..." : config.buttonText}
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
