"use client"
import React, { FC } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { Settings, Grid, Calendar, Layers } from "react-feather"

const icons = {
  Settings,
  Grid,
  Calendar,
  Layers
}

const SidebarLink: FC<SidebarLink> = ({ link }) => {
  const pathname = usePathname()
  let isActive = false

  if (pathname === link.route) {
    isActive = true
  }

  const Icon = icons[link.icon]

  return (
    <Link href={link.route} className="w-full flex justify-center items-center">
      <Icon
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  )
}

export default SidebarLink
