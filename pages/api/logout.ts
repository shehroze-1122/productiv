import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      serialize("jwt", "deleted", {
        maxAge: -1,
        path: "/"
      })
    )
    res.status(200).json({ message: "success" })
  }
}
