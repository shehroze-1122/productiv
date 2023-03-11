import React, { FC, ReactNode } from "react"
import Modal from "react-modal"
import { X } from "react-feather"
import Button from "./Button"

Modal.setAppElement("#modal")

type Dialog = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}
const Dialog: FC<Dialog> = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
      className="w-1/2 bg-white rounded-xl p-8 relative"
    >
      <Button
        intent="text"
        className="absolute top-2 right-2"
        onClick={onClose}
      >
        <X className="stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out" />
      </Button>
      {children}
    </Modal>
  )
}

export default Dialog
