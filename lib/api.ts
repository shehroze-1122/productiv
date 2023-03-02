type Fetcher = {
  url: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  body?: { [k: string]: any }
  json?: boolean
  headers?: { [k: string]: any }
}

const defaultHeader = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

export const fetcher = async ({
  url,
  method,
  body,
  headers = defaultHeader,
  json = true
}: Fetcher) => {
  const response = await fetch(url, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) })
  })

  if (json) {
    return response.json()
  }
}

type ApiResponse = {
  error?: string
}

export const register = (user: Omit<User, "id">) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user
  }) as Promise<ApiResponse>
}

export const signin = (user: Pick<User, "email" | "password">) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user
  }) as Promise<ApiResponse>
}
