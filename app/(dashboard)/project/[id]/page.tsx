import React from "react"
import Card from "@/components/common/Card"
import TasksCard from "@/components/Home/Projects/Tasks/TasksCard"
import { getUserFromCookie } from "@/lib/cookies"
import { db } from "@/lib/db"
import CreateNewButton from "@/components/common/CreateNewButton"
import ProjectForm from "@/components/Home/Projects/ProjectForm"
import TaskForm from "@/components/Home/Projects/Tasks/TaskForm"

const getData = async (id: string) => {
  const user = await getUserFromCookie()
  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id
    },
    include: {
      tasks: true
    }
  })
  return project
}
const ProjectDetails = async ({ params }: { params: { id: string } }) => {
  const project = await getData(params.id)
  if (!project) return <h2 className="text-red-700">No Project Found</h2>

  const { id, name, description, due, updatedAt } = project

  return (
    <div className="h-full w-full overflow-y-auto p-3">
      <Card className="p-4 mb-2">
        <div className="flex justify-between">
          <h1 className="text-2xl text-gray-700">{name}</h1>
          <CreateNewButton mode="edit">
            <ProjectForm
              mode="edit"
              initialData={{
                name,
                id,
                ...(description && { description }),
                ...(due && { due: due.toISOString() })
              }}
            />
          </CreateNewButton>
        </div>
        <h2 className="text-xs text-gray-400 mt-1">
          Last Updated on{" "}
          <span className="font-bold">
            {new Date(updatedAt).toDateString()}
          </span>
        </h2>
        {due && (
          <div className="bg-violet-500 text-white text-xs rounded-md w-max my-2 p-2">
            <span className="font-bold">Due: </span>
            {new Date(due).toDateString()}
          </div>
        )}
        <p className="text-gray-500 mt-3">{description}</p>
      </Card>

      <Card className="p-4 mb-2 flex justify-between items-center">
        <h2 className="text-2xl text-gray-700">Tasks</h2>
        <CreateNewButton mode="add">
          <TaskForm mode="add" projectId={project.id} />
        </CreateNewButton>
      </Card>
      <TasksCard tasks={project.tasks} />
    </div>
  )
}

export default ProjectDetails
