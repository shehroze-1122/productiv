"use client"
import React, { FC } from "react"
import CreateNewButton from "@/components/common/CreateNewButton"
import ProjectForm from "./ProjectForm"

type CreateNewProject = {
  initialData: Omit<Project, "due"> & {
    id: string
    due?: string
  }
}

const CreateNewProject: FC<CreateNewProject> = ({ initialData }) => {
  return (
    <CreateNewButton mode="edit">
      {(closeModal) => (
        <ProjectForm
          onClose={closeModal}
          mode="edit"
          initialData={initialData}
        />
      )}
    </CreateNewButton>
  )
}

export default CreateNewProject
