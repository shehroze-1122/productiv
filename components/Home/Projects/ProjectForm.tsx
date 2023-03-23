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
import { createProject, updateProject } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { formatDateForInput } from "@/lib/date"

type ProjectForm = {
  onClose: () => void
}

type AddProjectForm = ProjectForm & {
  mode?: "add"
}
type EditProjectForm = ProjectForm & {
  mode: "edit"
  initialData: Omit<Project, "due"> & {
    id: string
    due?: string
  }
}

type ProjectFormProps = ProjectForm & {
  mode?: "add" | "edit"
  initialData?: Omit<Project, "due"> & {
    id: string
    due?: string
  }
}

function ProjectForm(props: AddProjectForm): JSX.Element
function ProjectForm(props: EditProjectForm): JSX.Element
function ProjectForm({
  mode = "add",
  onClose,
  initialData = {
    id: "",
    name: ""
  }
}: ProjectFormProps) {
  const fields = useMemo(
    () => [
      {
        name: "name" as const,
        placeholder: "Project Name",
        label: "Name",
        required: true,
        type: "text"
      },
      {
        name: "description" as const,
        placeholder: "Project Description",
        label: "Description",
        required: false,
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
      due: initialData.due ? formatDateForInput(initialData.due) : ""
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

    const { name, description, due } = state

    const dataObj = {
      name,
      ...(description && { description }),
      ...(due && { due: new Date(due) })
    }
    try {
      setLoading(true)
      let isValid = true

      if (mode === "add") {
        const { error } = await createProject(dataObj)
        if (error) {
          isValid = false
          toast.error(`Failed to create the project. Error: ${error}`)
        } else {
          toast.success("Successfully created the project!")
        }
      } else {
        const { error } = await updateProject(initialData.id, dataObj)
        if (error) {
          isValid = false
          toast.error(`Failed to update the project. Error: ${error}`)
        } else {
          toast.success("Successfully updated the project!")
        }
      }
      if (isValid) {
        startTransition(() => {
          onClose()
          router.refresh()
          setState(initialState)
        })
      }
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl text-gray-700 mb-4">
        {mode === "edit" ? "Update Project" : "Create New Project"}
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
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading || isPending}>
          {loading || isPending ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm
