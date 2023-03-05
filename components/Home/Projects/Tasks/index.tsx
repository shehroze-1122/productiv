import { delay } from "@/lib/async"
import { getUserFromCookie } from "@/lib/cookies"
import { db } from "@/lib/db"
import { TASK_STATUS } from "@prisma/client"
import React from "react"
import TasksCard from "./TasksCard"

const getData = async () => {
  await delay(6000)
  const user = await getUserFromCookie()

  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      deleted: false,
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
const Tasks = async () => {
  const tasks = await getData()
  return <TasksCard tasks={tasks} />
}

export default Tasks
