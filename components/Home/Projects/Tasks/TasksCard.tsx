import React, { FC } from "react"
import Card from "@/components/common/Card"
import { Task } from "@prisma/client"

type TasksCard = {
  tasks: Task[]
}

const TasksCard: FC<TasksCard> = ({ tasks }) => {
  return (
    <Card className="py-4 px-6">
      {tasks && tasks.length ? (
        tasks.map((task) => (
          <div key={task.id}>
            <div className="py-2 flex justify-between items-center">
              <div>
                <h6 className="text-gray-800">{task.name}</h6>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </div>
              {task.due && (
                <div className="bg-violet-500 text-white text-sm rounded-full p-2">
                  <span className="font-bold">Due: </span>
                  {new Date(task.due).toLocaleDateString()}
                </div>
              )}
            </div>
            <hr className="w-full" />
          </div>
        ))
      ) : (
        <div>No tasks</div>
      )}
    </Card>
  )
}

export default TasksCard
