"use client"
import React, {
  FC,
  MouseEvent,
  useCallback,
  useState,
  useTransition
} from "react"
import { Trash2 } from "react-feather"
import Button from "@/components/common/Button"
import ConfirmationDialog from "@/components/common/ConfirmationDialog"
import { deleteProject } from "@/lib/api"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { toast } from "react-toastify"

type DeleteButton = {
  id: string
  className?: string
}

const DeleteButton: FC<DeleteButton> = ({ id, className }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const closeModal = () => setIsOpen(false)
  const openModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const handleConfirm = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try {
        setLoading(true)
        const { error } = await deleteProject(id)
        if (error) {
          toast.error(`Failed to delete the project. Error: ${error}`)
        } else {
          toast.success("Successfully deleted the project")
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
    },
    [id]
  )

  return (
    <>
      <Button
        intent="text"
        size="medium"
        onClick={openModal}
        className={clsx(
          "flex justify-center items-center hover:bg-transparent px-1",
          className
        )}
      >
        <Trash2 className="inline mr-2" />
      </Button>
      <ConfirmationDialog
        isOpen={isOpen}
        loading={loading || isPending}
        onClose={closeModal}
        description="This will permanently delete this project"
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default DeleteButton
