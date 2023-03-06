"use client"
import React, { FC } from "react"
import CreateNewButton from "@/components/common/CreateNewButton"
import ProjectForm from "./ProjectForm"

type CreateNewProject = {
  mode: "edit" | "add"
  initialData: Omit<Project, "due"> & {
    id: string
    due?: string
  }
}

const CreateNewProject: FC<CreateNewProject> = ({ initialData, mode }) => {
  return (
    <CreateNewButton mode={mode}>
      {(closeModal) => (
        <ProjectForm
          onClose={closeModal}
          mode={mode}
          initialData={initialData}
        />
      )}
    </CreateNewButton>
  )
}

export default CreateNewProject
