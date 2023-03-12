"use client"
import React, { ChangeEvent, Dispatch, FC } from "react"

type FilterTasks = {
  date: string
  setDate: Dispatch<React.SetStateAction<string>>
}
const FilterTasks: FC<FilterTasks> = ({ date, setDate }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return null
    setDate(e.target.value)
  }
  return (
    <input name="due-date" type="date" value={date} onChange={handleChange} />
  )
}

export default FilterTasks
