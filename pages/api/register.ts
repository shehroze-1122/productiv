import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from "cookie"
import { db } from "@/lib/db"
import { hashPassword } from "@/lib/auth"
import { createJWT } from "@/lib/jwt"

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
