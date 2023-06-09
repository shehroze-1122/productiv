import Card from "@/components/common/Card"
import { getUserFromCookie } from "@/lib/cookies"
import { db } from "@/lib/db"
import { Task, TASK_STATUS } from "@prisma/client"
import React from "react"
import TasksCard from "./TasksCard"

const getData = async (projectId: string) => {
  const user = await getUserFromCookie()

  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      ...(projectId && { projectId }),
      NOT: {
        status: TASK_STATUS.COMPLETED
      }
    },
    take: 5,
    orderBy: {
      due: "asc"
    }
  })
  return tasks
}
const Tasks = async ({
  projectId,
  initialTasks
}: {
  projectId: string
  initialTasks?: Task[]
}) => {
  const tasks = initialTasks || (await getData(projectId))

  return (
    <Card className="py-4 px-6">
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
              due: task.due ? task.due.toLocaleDateString() : undefined
            }}
          />
        ))
      ) : (
        <div>No recent tasks</div>
      )}
    </Card>
  )
}

export default Tasks
