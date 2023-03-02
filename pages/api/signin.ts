import { NextApiRequest, NextApiResponse } from "next"
import { comparePasswords } from "@/lib/auth"
import { createJWT } from "@/lib/jwt"
import { db } from "@/lib/db"
import { serialize } from "cookie"

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.method === "POST")) return res.status(402).end()

  const { email, password } = req.body as Pick<User, "email" | "password">

  if (!password || !email)
    return res.status(400).send({ error: "Bad user input" })

  const user = await db.user.findUnique({
    where: {
      email
    }
  })

  if (!user)
    return res.status(404).send({ error: "Incorrect Email or Password" })

  const passwordMatches = await comparePasswords(password, user.password)

  if (!passwordMatches)
    return res.status(401).send({ error: "Incorrect Email or Password" })

  const jwt = await createJWT(user)

  res.setHeader(
    "Set-Cookie",
    serialize(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60
    })
  )
  res.status(201).json({})
}
