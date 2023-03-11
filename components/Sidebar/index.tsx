import React from "react"
import Card from "@/components/common/Card"
import SidebarLink from "./SidebarLink"

const links: Link[] = [
  { id: 1, label: "Home", icon: "Grid", route: "/home" },
  {
    id: 2,
    label: "Calendar",
    icon: "Calendar",
    route: "/calendar"
  },
  {
    id: 3,
    label: "Projects",
    icon: "Layers",
    route: "/projects"
  },
  {
    id: 4,
    label: "Settings",
    icon: "Settings",
    route: "/settings"
  }
]

const Sidebar = () => {
  return (
    <Card className="h-full w-20 flex items-center justify-center flex-wrap px-6 py-4">
      {links.map((link) => (
        <SidebarLink
          key={link.id}
          link={{
            route: link.route,
            icon: link.icon
          }}
        />
      ))}
    </Card>
  )
}

export default Sidebar
