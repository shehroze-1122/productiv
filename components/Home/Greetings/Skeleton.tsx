import React from "react"
import Card from "@/components/common/Card"

const GreetingsSkeleton = () => {
  // <div className="mb-4">
  //     <h1 className="text-3xl text-gray-700 font-bold mb-4">
  //       Hello, {user.firstName}!
  //     </h1>
  //     <h4 className="text-xl text-gray-400">
  //       Check your daily tasks and schedule
  //     </h4>
  //   </div>
  //   <div>
  //     <Button size="large">Today&apos;s Schedule</Button>
  //   </div>
  return (
    <Card className="w-full py-4 px-6">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3 mb-4">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
          </div>
          <div className="h-10 w-36 bg-gray-300 rounded"></div>
        </div>
      </div>
    </Card>
  )
}

export default GreetingsSkeleton
