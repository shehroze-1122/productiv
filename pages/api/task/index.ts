import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { isError } from "@/lib/jwt"
import { NextApiRequest, NextApiResponse } from "next"

export default async function createProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Incorrect method" })
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
