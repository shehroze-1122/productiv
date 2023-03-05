import React from "react"
import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

type Card = PropsWithChildren & {
  className?: string
}

const Card: FC<Card> = ({ className, children }) => {
  return (
    <div className={clsx("rounded-3xl drop-shadow-xl bg-white", className)}>
      {children}
    </div>
  )
}

export default Card
