import React, { Suspense } from "react"
import Card from "@/components/common/Card"
import CreateNewButton from "@/components/Home/Projects/CreateNewButton"
import Loading from "@/components/common/Loading"
import Projects from "@/components/Home/Projects"

const ProjectsPage = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-3">
      <Card className="p-4 mb-2 flex justify-between items-center">
        <h2 className="text-2xl text-gray-700">Projects</h2>
        <CreateNewButton />
      </Card>
      <div className="flex grow items-stretch flex-wrap mt-3">
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error Server Component */}
          <Projects />
        </Suspense>
      </div>
    </div>
  )
}

export default ProjectsPage
