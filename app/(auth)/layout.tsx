import React, { FC, PropsWithChildren } from "react"
import GlassPane from "@/components/common/GlassPane"
import "@/styles/global.css"

const AuthRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-4">
        <GlassPane className="w-full h-full flex justify-center items-center p-4">
          {children}
        </GlassPane>
      </body>
    </html>
  )
}

export default AuthRootLayout
