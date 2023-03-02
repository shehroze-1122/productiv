import { NextRequest, NextResponse } from "next/server"
import { validateJWT } from "@/lib/jwt"

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl

  const PUBLIC_FILE = /\.(.*)$/

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const jwtCookie = req.cookies.get(process.env.COOKIE_NAME as string)

  if (!jwtCookie) {
    if (pathname.startsWith("/signin") || pathname.startsWith("/register")) {
      return NextResponse.next()
    }
    req.nextUrl.pathname = "/signin"
    return NextResponse.redirect(req.nextUrl)
  }

  try {
    await validateJWT(jwtCookie.value)
    if (pathname.startsWith("/signin") || pathname.startsWith("/register")) {
      req.nextUrl.pathname = "/home"
      return NextResponse.redirect(req.nextUrl)
    }
    return NextResponse.next()
  } catch (error) {
    req.nextUrl.pathname = "/signin"
    return NextResponse.redirect(req.nextUrl)
  }
}
