import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { isError } from "@/lib/jwt"
import { NextApiRequest, NextApiResponse } from "next"

export default async function createProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const response = await validateRequest(req)

    if (isError(response)) {
      return res.status(401).json(response)
    }

    const body = req.body as Task

    if (!body.name || !body.description)
      return res.status(404).json({ error: "Not enough data" })
    try {
      await db.task.create({
        data: { ...body, ownerId: response.id }
      })

      return res.status(200).json({ message: "ok" })
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" })
    }
  }

  if (req.method === "GET") {
    const response = await validateRequest(req)

    if (isError(response)) {
      return res.status(401).json(response)
    }

    const due = req.query.due as string

    if (!due) return res.status(404).json({ error: "Not enough data" })

    try {
      const tasks = await db.task.findMany({
        where: {
          due,
          ownerId: response.id
        }
      })

      return res.status(200).json({ data: tasks })
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" })
    }
  }
}
