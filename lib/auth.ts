import bcrypt from "bcrypt"
import Cookies from "js-cookie"
import { db } from "./db"
import { validateJWT } from "./jwt"

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (
  textPassword: string,
  hashedPassword: string
) => bcrypt.compare(textPassword, hashedPassword)

export const getUserFromCookie = async () => {
  const jwt = Cookies.get(process.env.COOKIE_NAME as string)

  if (!jwt) {
    throw new Error("Unable to authenticate. Token not found.")
  }
  try {
    const { id } = await validateJWT(jwt)

    const user = await db.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    throw new Error("Failed to verify the token.")
  }
}
