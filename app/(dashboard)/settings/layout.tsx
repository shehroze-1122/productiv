import Card from "@/components/common/Card"
import SignOutButton from "@/components/Settings/SignOutButton"
import React, { FC, PropsWithChildren } from "react"

const SettingsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-full w-full overflow-y-auto p-3">
      <Card className="p-4 mb-2 flex justify-between items-center">
        <h2 className="text-2xl text-gray-700">Settings</h2>
        <SignOutButton />
      </Card>
      <Card className="p-4 mb-2 flex justify-between items-center">
        {children}
      </Card>
    </div>
  )
}

export default SettingsLayout
