import React from "react"
import { Suspense } from "react"
import Greetings from "@/components/Home/Greetings"
import GreetingsSkeleton from "@/components/Home/Greetings/Skeleton"
import Projects from "@/components/Home/Projects"
import Tasks from "@/components/Home/Projects/Tasks"
import Loading from "@/components/common/Loading"
import TasksLoading from "@/components/Home/Projects/Tasks/Skeleton"
import Card from "@/components/common/Card"
import Link from "next/link"

export default function Page() {
  return (
    <div className="h-full overflow-y-auto w-full p-3 items-stretch justify-center min-h-[content]">
      <div className="flex-1 grow flex">
        <Suspense fallback={<GreetingsSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <Greetings />
        </Suspense>
      </div>
      <div className="flex-1">
        <Card className="p-4 mt-3 mb-2 w-max">
          <Link href="/projects">
            <h2 className="text-2xl text-gray-700 font-bold">Projects</h2>
          </Link>
        </Card>
        <div className="flex grow items-center flex-wrap mt-3">
          <Suspense fallback={<Loading />}>
            {/* @ts-expect-error Server Component */}
            <Projects limit={3} />
          </Suspense>
        </div>
      </div>
      <div className="mt-6 flex-2 grow">
        <Card className="p-4 mt-3 mb-2 w-max">
          <h2 className="text-2xl text-gray-700 font-bold">Recent Todos</h2>
        </Card>
        <div className="w-full">
          <Suspense fallback={<TasksLoading />}>
            {/* @ts-expect-error Server Component */}
            <Tasks />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
