import { Task } from "@prisma/client"

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

export const deleteProject = (id: string) => {
  return fetcher({
    url: `/api/project/${id}`,
    method: "DELETE"
  }) as Promise<ApiResponse>
}

type TaskDataObj = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "deleted" | "ownerId"
>

export const createTask = (dataObj: TaskDataObj) => {
  return fetcher({
    url: "/api/task",
    method: "POST",
    body: dataObj
  }) as Promise<ApiResponse>
}

export const updateTask = (id: string, dataObj: TaskDataObj) => {
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

export const getTasksByDueDate = (date: string) => {
  return fetcher({
    url: `/api/task?due=${date}`,
    method: "GET"
  }) as Promise<{ data: Task[]; error?: string }>
}

export const logout = () => {
  return fetcher({
    url: "/api/logout",
    method: "GET"
  }) as Promise<{ message: string }>
}

export const updateAccount = (dataObj: {
  firstName: string
  lastName: string | null
}) => {
  return fetcher({
    url: "/api/update-account",
    method: "PUT",
    body: dataObj
  })
}

export const updatePassword = (
  currentPassword: string,
  newPassword: string
) => {
  return fetcher({
    url: "/api/update-password",
    method: "PUT",
    body: { newPassword, currentPassword }
  })
}
