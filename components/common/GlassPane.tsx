import React, { FC, PropsWithChildren } from "react"
import clsx from "clsx"

type GlassPane = PropsWithChildren & {
  className?: string
}

const GlassPane: FC<GlassPane> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200 ",
        className
      )}
    >
      {children}
    </div>
  )
}

export default GlassPane
