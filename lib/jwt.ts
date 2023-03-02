import { jwtVerify, SignJWT } from "jose"

type Payload = { email: string; id: string }

export const createJWT = (user: Payload) => {
  const iat = Math.floor(Date.now() / 1000) // Date.now() => milliseconds => /1000 => seconds
  const exp = iat + 7 * 24 * 60 * 60 // 7 days expiry
  return new SignJWT({ email: user.email, id: user.id })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )
  return payload as Payload
}
