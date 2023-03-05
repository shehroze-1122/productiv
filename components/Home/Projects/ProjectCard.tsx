import React, { FC } from "react"
import Card from "@/components/common/Card"
import { Prisma } from "@prisma/client"
import { formatDate } from "@/lib/date"

const projectsWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true }
})

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectsWithTasks>

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length

  console.log(project.due)

  const progress =
    project.tasks.length !== 0
      ? Math.ceil((completedCount / project.tasks.length) * 100)
      : 0

  return (
    <Card className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
        </span>
      </div>
      <div>
        <progress
          id="tasks"
          value={progress}
          max="100"
          className="w-full h-2 bg-violet-200 rounded-full mb-2 progress"
        >
          {progress}%
        </progress>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-600 font-semibold">{progress}%</span>
      </div>
      {/* </div> */}
    </Card>
  )
}

export default ProjectCard
