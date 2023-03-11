"use client"
import React, { FC, useState } from "react"
import { Plus } from "react-feather"
import Button from "@/components/common/Button"
import Dialog from "@/components/common/Dialog"
import TaskForm from "./TaskForm"

type CreateNewButton = {
  projectId: string
}
const CreateNewButton: FC<CreateNewButton> = ({ projectId }) => {
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
        <Plus className="inline mr-2" /> Add
      </Button>

      <Dialog isOpen={isOpen} onClose={closeModal}>
        <TaskForm mode="add" projectId={projectId} onClose={closeModal} />
      </Dialog>
    </div>
  )
}

export default CreateNewButton
