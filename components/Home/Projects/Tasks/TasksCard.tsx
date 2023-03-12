import React, { FC } from "react"
import { TASK_STATUS } from "@prisma/client"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import clsx from "clsx"

type TasksCard = {
  task: Omit<Task, "due"> & { id: string; due?: string }
}

const statusMap = {
  [TASK_STATUS.COMPLETED]: {
    title: "Done",
    styles: "border-green-600 text-green-600 bg-green-300"
  },
  [TASK_STATUS.NOT_STARTED]: {
    title: "Pending",
    styles: "border-red-600 text-red-600 bg-red-300"
  },
  [TASK_STATUS.STARTED]: {
    title: "In Progress",
    styles: "border-orange-600 text-orange-600 bg-orange-300"
  }
}

const TasksCard: FC<TasksCard> = ({ task }) => {
  return (
    <div key={task.id}>
      <div className="py-2 flex justify-between items-center">
        <div>
          <h6 className="text-gray-800">{task.name}</h6>
          <p className="text-gray-400 text-sm">{task.description}</p>
        </div>
        <div className="flex items-center">
          <span
            className={clsx(
              "border-2 border-solid rounded-full py-1 px-2 mr-2",
              statusMap[task.status].styles
            )}
          >
            {statusMap[task.status].title}
          </span>
          {task.due && (
            <div className="bg-violet-500 text-white text-sm rounded-full p-2 mr-2">
              <span className="font-bold">Due: </span>
              {new Date(task.due).toLocaleDateString()}
            </div>
          )}
          <EditButton initialData={task} projectId={task.projectId} />
          <DeleteButton id={task.id} />
        </div>
      </div>
      <hr className="w-full" />
    </div>
  )
}

export default TasksCard
