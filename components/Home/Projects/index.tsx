import { delay } from "@/lib/async"
import { getUserFromCookie } from "@/lib/cookies"
import { db } from "@/lib/db"
import Link from "next/link"
import React from "react"
import ProjectCard from "./ProjectCard"

const getData = async () => {
  await delay(1000)
  const user = await getUserFromCookie()

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id
    },
    include: {
      tasks: true
    }
  })
  return { projects }
}

const Projects = async () => {
  const { projects } = await getData()
  return projects.map((project) => (
    <div className="w-1/3 pr-3 pb-3" key={project.id}>
      <Link href={`/project/${project.id}`}>
        <ProjectCard project={project} />
      </Link>
    </div>
  ))
}

export default Projects
