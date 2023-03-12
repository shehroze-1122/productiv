type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

type Project = {
  name: string
  description?: string
  due?: Date
}

type Task = {
  name: string
  description: string
  due?: string
  status: "NOT_STARTED" | "STARTED" | "COMPLETED"
  projectId: string
}
