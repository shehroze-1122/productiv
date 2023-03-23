"use client"
import React, { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react"
import { Save } from "react-feather"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import { updatePassword } from "@/lib/api"
import { toast } from "react-toastify"

const UpdatePassword = () => {
  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  }

  const entities = useRef(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fields = useMemo(
    () => [
      {
        name: "currentPassword" as const,
        label: "Current Password",
        required: true,
        type: "password"
      },
      {
        name: "newPassword" as const,
        label: "New Password",
        required: true,
        type: "password"
      },
      {
        name: "confirmNewPassword" as const,
        label: "Confirm New Password",
        required: true,
        type: "password"
      }
    ],
    []
  )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    entities.current = {
      ...entities.current,
      [e.target.name]: e.target.value
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (entities.current.newPassword !== entities.current.confirmNewPassword) {
      setError("Passwords don't match")
      return
    } else {
      setError("")
    }

    try {
      setLoading(true)
      const { error } = await updatePassword(
        entities.current.currentPassword,
        entities.current.newPassword
      )
      if (error) {
        setError(error)
      } else {
        toast.success("Successfully update the password!")
      }
      entities.current = initialState
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, i) => {
        const { label, ...inputProps } = field
        return (
          <div key={i} className="mb-6 w-full pr-2">
            <label
              htmlFor={field.name}
              className="text-lg mb-4 ml-2 text-black/50"
            >
              {label}
            </label>
            <Input {...inputProps} onChange={handleChange} />
          </div>
        )
      })}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Button
        type="submit"
        className="flex justify-center items-center"
        disabled={loading}
      >
        <Save className="inline mr-2" /> {loading ? "Loading..." : "Save"}
      </Button>
    </form>
  )
}

export default UpdatePassword
