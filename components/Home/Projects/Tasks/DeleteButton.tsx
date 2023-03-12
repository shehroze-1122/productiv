"use client"
import React, { FC, useCallback, useState, useTransition } from "react"
import { Trash2 } from "react-feather"
import Button from "@/components/common/Button"
import ConfirmationDialog from "@/components/common/ConfirmationDialog"
import { deleteTask } from "@/lib/api"
import { useRouter } from "next/navigation"

type DeleteButton = {
  id: string
}

const DeleteButton: FC<DeleteButton> = ({ id }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handleConfirm = useCallback(async () => {
    try {
      setLoading(true)
      const response = await deleteTask(id)
      startTransition(() => {
        closeModal()
        router.refresh()
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [id])

  return (
    <>
      <Button
        intent="text"
        size="medium"
        onClick={openModal}
        className="flex justify-center items-center hover:bg-transparent px-0"
      >
        <Trash2 className="inline" />
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        loading={loading || isPending}
        onClose={closeModal}
        description="This will permanently delete this task"
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default DeleteButton
