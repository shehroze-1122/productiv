import React, { FC } from "react"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"

type TasksCard = {
  task: Omit<Task, "due"> & { id: string; due?: string }
  projectId: string
}

const TasksCard: FC<TasksCard> = ({ task, projectId }) => {
  return (
    <div key={task.id}>
      <div className="py-2 flex justify-between items-center">
        <div>
          <h6 className="text-gray-800">{task.name}</h6>
          <p className="text-gray-400 text-sm">{task.description}</p>
        </div>
        <div className="flex">
          {task.due && (
            <div className="bg-violet-500 text-white text-sm rounded-full p-2 mr-2">
              <span className="font-bold">Due: </span>
              {new Date(task.due).toLocaleDateString()}
            </div>
          )}
          <EditButton initialData={task} projectId={projectId} />
          <DeleteButton id={task.id} />
        </div>
      </div>
      <hr className="w-full" />
    </div>
  )
}

export default TasksCard
