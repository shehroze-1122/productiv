import React, { FC, PropsWithChildren } from "react"
import GlassPane from "@/components/common/GlassPane"
import "@/styles/global.css"
import { Inter } from "@next/font/google"
import Sidebar from "@/components/Home/Sidebar/index"
import ReactToastifyContainer from "@/components/common/ReactToastifyContainer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const AuthRootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className={inter.variable}>
      <head />
      <body className="h-screen w-screen animated-gradient p-10">
        <GlassPane className="w-full h-full p-2 flex items-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal"></div>
        <ReactToastifyContainer />
      </body>
    </html>
  )
}

export default AuthRootLayout
