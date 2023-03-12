import { getUserFromCookie } from "@/lib/cookies"
import { db } from "@/lib/db"
import Link from "next/link"
import React from "react"
import ProjectCard from "./ProjectCard"

const getData = async (take?: number) => {
  const user = await getUserFromCookie()

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id
    },
    include: {
      tasks: true
    },
    orderBy: {
      due: "asc"
    },
    ...(take && { take })
  })
  return { projects }
}

const Projects = async ({ limit }: { limit?: number }) => {
  const { projects } = await getData(limit)

  return projects.map((project) => (
    <div className="w-1/3 pr-3 pb-3 h-full" key={project.id}>
      <Link href={`/project/${project.id}`}>
        <ProjectCard project={project} />
      </Link>
    </div>
  ))
}

export default Projects
