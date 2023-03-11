"use client"
import React, {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
  useTransition
} from "react"
import Input from "@/components/common/Input"
import Button from "@/components/common/Button"
import { createTask, updateProject } from "@/lib/api"
import { TASK_STATUS } from "@prisma/client"
import { useRouter } from "next/navigation"

type TaskForm = {
  projectId: string
}
type AddTaskForm = TaskForm & {
  mode?: "add"
}

type EditTaskForm = TaskForm & {
  mode: "edit"
  initialData: { id: string } & Omit<Task, "projectId">
}
type TaskFormProps = TaskForm & {
  mode?: "add" | "edit"
  initialData?: { id: string } & Omit<Task, "projectId">
}

function TaskForm(props: AddTaskForm): JSX.Element
function TaskForm(props: EditTaskForm): JSX.Element
function TaskForm(props: TaskFormProps): JSX.Element
function TaskForm({
  mode = "add",
  projectId,
  initialData = {
    id: "",
    name: "",
    description: "",
    status: "NOT_STARTED"
  }
}: TaskFormProps) {
  const fields = useMemo(
    () => [
      {
        name: "name" as const,
        placeholder: "Task Name",
        label: "Name",
        required: true,
        type: "text"
      },
      {
        name: "description" as const,
        placeholder: "Task Description",
        label: "Description",
        required: true,
        type: "text"
      },
      {
        name: "due" as const,
        placeholder: "Due by",
        label: "Due by",
        required: false,
        type: "date"
      }
    ],
    []
  )

  const initialState = useMemo(
    () => ({
      name: initialData.name || "",
      description: initialData.description || "",
      due: initialData.due
        ? new Date(initialData.due).toLocaleDateString()
        : "",
      status: initialData.status || ""
    }),
    [initialData]
  )

  const [state, setState] = useState<typeof initialState>(initialState)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { due, ...otherFields } = state

    const dataObj = {
      ...otherFields,
      projectId,
      ...(due && { due: new Date(due) })
    }
    try {
      setLoading(true)
      if (mode === "add") {
        await createTask(dataObj)
      } else {
        await updateProject(initialData.id, dataObj)
      }
      startTransition(() => {
        router.refresh()
        setState(initialState)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl text-gray-700 mb-4">
        {mode === "edit" ? "Update Task" : "Create New Task"}
      </h1>
      <div className="flex flex-wrap justify-between items-center">
        {fields.map((field, i) => {
          const { label, ...inputProps } = field
          return (
            <div key={i} className="mb-6 w-1/2 pr-2">
              <label
                htmlFor={field.name}
                className="text-lg mb-4 ml-2 text-black/50"
              >
                {label}
              </label>
              <Input
                {...inputProps}
                onChange={handleChange}
                value={state[field.name]}
              />
            </div>
          )
        })}
        <div className="mb-6 w-1/2 pr-2">
          <label htmlFor="status" className="text-lg mb-4 ml-2 text-black/50">
            Task
          </label>
          <select
            name="status"
            id="status"
            onChange={(e) => console.log(e.target.value)}
            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
          >
            <option value={TASK_STATUS.NOT_STARTED}>Pending</option>
            <option value={TASK_STATUS.STARTED}>In Progress</option>
            <option value={TASK_STATUS.COMPLETED}>Done</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading || isPending}>
          {loading || isPending ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
