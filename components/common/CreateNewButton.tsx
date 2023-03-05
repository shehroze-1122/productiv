"use client"
import React, { FC, ReactElement, useState } from "react"
import Modal from "react-modal"
import Button from "./Button"
import { X, Plus, Edit2 } from "react-feather"

Modal.setAppElement("#modal")

type CreateNewButton = {
  mode: "edit" | "add"
  children: (closeModal: () => void) => ReactElement
}

const IconMap = {
  add: Plus,
  edit: Edit2
}

const CreateNewButton: FC<CreateNewButton> = ({ children, mode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const ButtonIcon = IconMap[mode]

  return (
    <div>
      <Button
        intent="primary"
        size="medium"
        onClick={openModal}
        className="flex justify-center items-center"
      >
        <ButtonIcon className="inline mr-2" />{" "}
        {mode === "edit" ? "Edit" : "Add"}
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-1/2 bg-white rounded-xl p-8 relative"
      >
        <Button
          intent="text"
          className="absolute top-2 right-2"
          onClick={closeModal}
        >
          <X className="stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out" />
        </Button>
        {children(closeModal)}
      </Modal>
    </div>
  )
}

export default CreateNewButton
