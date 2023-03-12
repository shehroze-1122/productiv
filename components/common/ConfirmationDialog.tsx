import React, { FC, MouseEvent } from "react"
import Button from "./Button"
import Dialog from "./Dialog"

type ConfirmationDialog = {
  isOpen: boolean
  loading: boolean
  onClose: () => void
  description: string
  handleConfirm: (e: MouseEvent<HTMLButtonElement>) => void
}

const ConfirmationDialog: FC<ConfirmationDialog> = ({
  isOpen,
  loading,
  onClose,
  description,
  handleConfirm
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <h1 className="text-3xl text-gray-700 font-bold">Are you sure?</h1>
      <p className="text-xl text-gray-600 mt-6">{description}</p>
      <div className="flex justify-end items-center mt-4">
        <Button intent="secondary" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button intent="primary" onClick={handleConfirm} disabled={loading}>
          {loading ? "Loading..." : "Proceed"}
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmationDialog
