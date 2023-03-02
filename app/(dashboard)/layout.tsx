import React, { FC, PropsWithChildren } from "react"
import GlassPane from "@/components/common/GlassPane"
import "@/styles/global.css"
import { Inter } from "@next/font/google"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const AuthRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className={inter.variable}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-10">
        <GlassPane className="w-full h-full flex justify-center items-center">
          {children}
        </GlassPane>
      </body>
    </html>
  )
}

export default AuthRootLayout
