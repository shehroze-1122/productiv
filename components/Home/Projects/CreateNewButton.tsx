"use client"
import React, { useState } from "react"
import { Plus } from "react-feather"
import Button from "@/components/common/Button"
import Dialog from "@/components/common/Dialog"
import ProjectForm from "./ProjectForm"

const CreateNewButton = () => {
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
        <ProjectForm mode="add" onClose={closeModal} />
      </Dialog>
    </div>
  )
}

export default CreateNewButton
