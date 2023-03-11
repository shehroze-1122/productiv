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

export const createProject = (dataObj: Project) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: dataObj
  }) as Promise<ApiResponse>
}

export const updateProject = (id: string, dataObj: Project) => {
  return fetcher({
    url: `/api/project/${id}`,
    method: "PUT",
    body: dataObj
  }) as Promise<ApiResponse>
}

export const createTask = (dataObj: Task) => {
  return fetcher({
    url: "/api/task",
    method: "POST",
    body: dataObj
  }) as Promise<ApiResponse>
}

export const updateTask = (id: string, dataObj: Task) => {
  return fetcher({
    url: `/api/task/${id}`,
    method: "PUT",
    body: dataObj
  }) as Promise<ApiResponse>
}

export const deleteTask = (id: string) => {
  return fetcher({
    url: `/api/task/${id}`,
    method: "DELETE"
  }) as Promise<ApiResponse>
}
