import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db"
import { validateRequest } from "@/lib/auth"
import { isError } from "@/lib/jwt"

export default async function projectHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Incorrect method" })
  const response = await validateRequest(req)

  if (isError(response)) {
    return res.status(401).json(response)
  }

  const body = req.body as Project

  if (!body.name) return res.status(404).json({ error: "Not enough data" })

  try {
    await db.project.create({
      data: {
        ...body,
        ownerId: response.id
      }
    })
    res.status(200).json({ message: "success" })
  } catch (error) {
    res.status(500).json({ error: "Failed to create the project" })
  }
}
