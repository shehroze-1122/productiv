"use client"
import React, { useState } from "react"
import Card from "@/components/common/Card"
import FilterTasks from "@/components/Home/Calendar/FilterTasks"
import Tasks from "@/components/Home/Calendar/Tasks"

const Calendar = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  return (
    <div className="h-full w-full overflow-y-auto p-3">
      <Card className="p-4 mb-2 flex items-center w-max">
        <h2 className="text-2xl mr-4 text-gray-700">Tasks</h2>
        <FilterTasks date={date} setDate={setDate} />
      </Card>
      <div className="flex grow items-stretch flex-wrap mt-3">
        <Tasks date={date} />
      </div>
    </div>
  )
}

export default Calendar
