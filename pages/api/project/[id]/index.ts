import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { isError } from "@/lib/jwt"
import { NextApiRequest, NextApiResponse } from "next"

export default async function UpdateOrDeleteProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const response = await validateRequest(req)

    if (isError(response)) {
      return res.status(401).json(response)
    }

    const body = req.body as Project

    try {
      await db.project.update({
        where: {
          ownerId_id: {
            ownerId: response.id,
            id: req.query.id as string
          }
        },
        data: body
      })
      res.status(200).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ error: "Failed to update the project" })
    }
  }

  if (req.method === "DELETE") {
    const response = await validateRequest(req)

    if (isError(response)) {
      return res.status(401).json(response)
    }

    try {
      await db.project.delete({
        where: {
          ownerId_id: {
            id: req.query.id as string,
            ownerId: response.id
          }
        }
      })
      res.status(200).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the project" })
    }
  }
}
