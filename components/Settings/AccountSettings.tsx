"use client"
import React, { ChangeEvent, FC, FormEvent, useMemo, useState } from "react"
import { User } from "@prisma/client"
import { Save } from "react-feather"
import Input from "../common/Input"
import Button from "../common/Button"
import Link from "next/link"
import { updateAccount } from "@/lib/api"

type AccountSettings = {
  user: Omit<User, "createdAt" | "updatedAt"> & {
    createdAt: string
    updatedAt: string
  }
}

const AccountSettings: FC<AccountSettings> = ({ user }) => {
  const initialState = useMemo(
    () => ({
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: user.email
    }),
    []
  )

  const [entities, setEntities] = useState<typeof initialState>(initialState)
  const [loading, setLoading] = useState(false)

  const fields = useMemo(
    () => [
      {
        name: "firstName" as const,
        label: "First Name",
        required: true,
        type: "text"
      },
      {
        name: "lastName" as const,
        label: "Last Name",
        type: "text"
      },
      {
        name: "email" as const,
        label: "Email",
        required: false,
        disabled: true,
        type: "email"
      }
    ],
    []
  )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntities((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataObj = {
      firstName: entities.firstName,
      lastName: entities.lastName || null
    }
    try {
      setLoading(true)
      await updateAccount(dataObj)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3">
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
              <Input
                {...inputProps}
                onChange={handleChange}
                value={entities[field.name]}
              />
            </div>
          )
        })}
        <Button
          type="submit"
          className="flex justify-center items-center"
          disabled={
            loading ||
            (user.firstName === entities.firstName && user.lastName
              ? user.lastName === entities.lastName
              : !entities.lastName)
          }
        >
          <Save className="inline mr-2" /> {loading ? "Loading..." : "Save"}
        </Button>
      </form>
      <Link href="/settings/update-password">
        <Button intent="secondary">Change password</Button>
      </Link>
    </div>
  )
}

export default AccountSettings
