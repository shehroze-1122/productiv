type Fetcher = {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  body?: { [k: string]: any }
  json?: Boolean
}
export const fetcher = async ({ url, method, body, json = true }: Fetcher) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...(body && { body: JSON.stringify(body) })
  })

  if (!response.ok) {
    throw new Error("Something wernt wrong")
  }
  if (json) {
    const data = await response.json()
    return data
  }
}

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const register = (user: User) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user
  })
}
export const signin = (user: Pick<User, "email" | "password">) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user
  })
}
