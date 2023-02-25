import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

type Card = PropsWithChildren & {
  className?: string
}

const Card: FC<Card> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
