"use client"
import React, { FC, useCallback, useState, useTransition } from "react"
import { Trash2 } from "react-feather"
import Button from "@/components/common/Button"
import ConfirmationDialog from "@/components/common/ConfirmationDialog"
import { deleteTask } from "@/lib/api"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "react-toastify"

type DeleteButton = {
  id: string
}

const DeleteButton: FC<DeleteButton> = ({ id }) => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/calendar") return null

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const handleConfirm = useCallback(async () => {
    try {
      setLoading(true)
      const { error } = await deleteTask(id)
      if (error) {
        toast.error(`Failed to delete the task. Error: ${error}`)
      } else {
        toast.success("Successfully deleted the task")
        startTransition(() => {
          closeModal()
          router.refresh()
        })
      }
    } catch (error) {
      toast.error("Something went wrong!")
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
        className="flex justify-center items-center hover:bg-transparent !px-0"
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
