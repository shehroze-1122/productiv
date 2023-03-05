import { cookies } from "next/headers"
import { db } from "./db"
import { validateJWT } from "./jwt"

export const getUserFromCookie = async () => {
  const jwt = cookies().get(process.env.COOKIE_NAME as string)

  if (!jwt) {
    throw new Error("Unable to authenticate. Token not found.")
  }
  try {
    const { id } = await validateJWT(jwt.value)

    const user = await db.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    console.log(error)
    throw new Error("Failed to verify the token.")
  }
}
