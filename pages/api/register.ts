import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from "cookie"
import { db } from "@/lib/db"
import { hashPassword } from "@/lib/auth"
import { createJWT } from "@/lib/jwt"
import { TASK_STATUS, User } from "@prisma/client"

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Incorrect method" })

  const { firstName, lastName, email, password } = req.body as User

  if (!password || !firstName || !email || !lastName)
    return res.status(400).json({ error: "Bad user input" })
  const hashedPassword = await hashPassword(password)

  try {
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })

    await seedProjectWithTasks(user)
    const jwt = await createJWT(user)

    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60
      })
    )
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: "User already exists" })
  }
}

async function seedProjectWithTasks(user: User) {
  const project = await db.project.create({
    data: {
      name: "Be Productive",
      description: "Master Procrastinator's Guide to Productivity",
      due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      ownerId: user.id
    }
  })

  await db.task.createMany({
    data: [
      {
        name: "Sign up on Productiv🚀",
        ownerId: user.id,
        projectId: project.id,
        due: new Date(),
        description: "Register on Productiv today!",
        status: TASK_STATUS.COMPLETED
      },
      {
        name: "Organize your closet",
        ownerId: user.id,
        projectId: project.id,
        due: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        description:
          "Say goodbye to that pile of clothes you've been meaning to donate and hello to a closet that Marie Kondo would be proud of",
        status: TASK_STATUS.NOT_STARTED
      },
      {
        name: "Learn a new skill",
        ownerId: user.id,
        projectId: project.id,
        due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        description:
          "Whether it's a language, a dance move, or a magic trick, challenge yourself to step out of your comfort zone and try something new",
        status: TASK_STATUS.STARTED
      }
    ]
  })
}
