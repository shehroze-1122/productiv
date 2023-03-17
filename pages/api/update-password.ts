import { NextApiRequest, NextApiResponse } from "next"
import { comparePasswords, hashPassword, validateRequest } from "@/lib/auth"
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

    const body = req.body as { currentPassword: string; newPassword: string }
    try {
      const user = await db.user.findUnique({
        where: {
          id: response.id
        },
        select: {
          password: true
        }
      })
      if (!user) return res.status(404).json({ error: "user not found" })

      const isMatch = await comparePasswords(
        body.currentPassword,
        user.password
      )

      if (!isMatch)
        return res.status(400).json({ error: "incorrect current password" })
    } catch (error) {
      console.log("Hello", error)
      return res.status(500).json({ message: "Failed to updated the password" })
    }

    const newHashedPassword = await hashPassword(body.newPassword)
    try {
      await db.user.update({
        where: {
          id: response.id
        },
        data: {
          password: newHashedPassword
        }
      })
      res.status(200).json({ message: "success" })
    } catch (error) {
      console.log("Hi", error)
      res.status(500).json({ error: "Failed to update the password" })
    }
  }
}
