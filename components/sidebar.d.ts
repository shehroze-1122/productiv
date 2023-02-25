type Link = {
  id: number
  label: string
  route: `/${any}`
  icon: "Settings" | "User" | "Grid" | "Calendar"
}

type SidebarLink = {
  link: Pick<Link, "icon" | "route">
}
