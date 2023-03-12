import Card from "@/components/common/Card"
import { getTasksByDueDate } from "@/lib/api"
import { Task } from "@prisma/client"
import React, { FC, useEffect, useState } from "react"
import TasksLoading from "../Projects/Tasks/Skeleton"
import TasksCard from "../Projects/Tasks/TasksCard"

type Tasks = {
  date: string
}

const Tasks: FC<Tasks> = ({ date }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTasksByDueDate(date)
      .then(({ data, error }) => {
        setTasks(data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [date])

  if (loading) {
    return <TasksLoading />
  }

  return (
    <Card className="py-4 px-6 w-full">
      {tasks && tasks.length ? (
        tasks.map((task) => (
          <TasksCard
            key={task.id}
            task={{
              id: task.id,
              projectId: task.projectId,
              name: task.name,
              description: task.description,
              status: task.status,
              due: task.due || undefined
            }}
          />
        ))
      ) : (
        <div>No tasks</div>
      )}
    </Card>
  )
}

export default Tasks
