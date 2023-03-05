import bcrypt from "bcrypt"
import { NextApiRequest } from "next"
import { validateJWT } from "./jwt"

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (
  textPassword: string,
  hashedPassword: string
) => bcrypt.compare(textPassword, hashedPassword)

export const validateRequest = async (req: NextApiRequest) => {
  const jwt = req.cookies[process.env.COOKIE_NAME as string]

  if (!jwt) return { error: "No un-authorized access" }

  try {
    return validateJWT(jwt)
  } catch (error) {
    return { error: "No un-authorized access" }
  }
}
