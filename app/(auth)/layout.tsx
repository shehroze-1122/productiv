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
      <body className="h-screen w-screen animated-gradient p-4">
        <GlassPane className="w-full h-full flex justify-center items-center p-4">
          {children}
        </GlassPane>
      </body>
    </html>
  )
}

export default AuthRootLayout
