import { NextApiRequest, NextApiResponse } from "next"
import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { isError } from "@/lib/jwt"

export default async function UpdateAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const response = await validateRequest(req)

    if (isError(response)) {
      return res.status(401).json(response)
    }

    const body = req.body as { firstName: string; lastName: string | null }

    try {
      await db.user.update({
        where: {
          id: response.id
        },
        data: body
      })
      res.status(200).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ error: "Failed to update the account" })
    }
  }
}
