import React from "react"
import Card from "@/components/common/Card"

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="p-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      </Card>
    </div>
  )
}

export default Loading
