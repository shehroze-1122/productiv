import React, { FC, PropsWithChildren } from "react"
import { Check, X } from "react-feather"
import { validatePassword, validations } from "@/lib/password"

type PasswordValidation = PropsWithChildren & {
  password: string
}

const PasswordValidation: FC<PasswordValidation> = ({ password }) => {
  return (
    <div>
      <p className="font-bold">Password must contain the following:</p>
      <ul className="flex justify-between flex-wrap mt-2">
        {validations.map((validation, i) => {
          const isValidated = validatePassword(validation.type, password)
          return (
            <li key={i} className="flex flex-col items-center">
              {isValidated ? (
                <Check className="text-green-600" />
              ) : (
                <X className="text-red-600" />
              )}
              <p className={isValidated ? "text-green-600" : "text-red-600"}>
                {validation.description}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PasswordValidation
