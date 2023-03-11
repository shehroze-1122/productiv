"use client"
import React, { FC, useState } from "react"
import { Edit2 } from "react-feather"
import Button from "@/components/common/Button"
import Dialog from "@/components/common/Dialog"
import ProjectForm from "./ProjectForm"

type EditButton = {
  initialData: Omit<Project, "due"> & {
    id: string
    due?: string
  }
}

const EditButton: FC<EditButton> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <div>
      <Button
        intent="primary"
        size="medium"
        onClick={openModal}
        className="flex justify-center items-center"
      >
        <Edit2 className="inline mr-2" /> Edit
      </Button>

      <Dialog isOpen={isOpen} onClose={closeModal}>
        <ProjectForm
          mode="edit"
          initialData={initialData}
          onClose={closeModal}
        />
      </Dialog>
    </div>
  )
}

export default EditButton
