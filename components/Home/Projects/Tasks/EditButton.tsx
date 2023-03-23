"use client"
import React, { FC, useState } from "react"
import { Edit2 } from "react-feather"
import Button from "@/components/common/Button"
import Dialog from "@/components/common/Dialog"
import TaskForm from "./TaskForm"
import { usePathname } from "next/navigation"

type EditButton = {
  projectId: string
  initialData: Omit<Task, "due"> & {
    id: string
    due?: string
  }
}

const EditButton: FC<EditButton> = ({ initialData, projectId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === "/calendar") return null

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <div>
      <Button
        intent="text"
        size="medium"
        onClick={openModal}
        className="flex justify-center items-center hover:bg-transparent px-0"
      >
        <Edit2 className="inline" />
      </Button>

      <Dialog isOpen={isOpen} onClose={closeModal}>
        <TaskForm
          mode="edit"
          initialData={initialData}
          projectId={projectId}
          onClose={closeModal}
        />
      </Dialog>
    </div>
  )
}

export default EditButton
