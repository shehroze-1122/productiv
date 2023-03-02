import React from "react"
import clsx from "clsx"
import { ComponentPropsWithoutRef, FC } from "react"

type Input = ComponentPropsWithoutRef<"input">

const Input: FC<Input> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  )
}

export default Input
