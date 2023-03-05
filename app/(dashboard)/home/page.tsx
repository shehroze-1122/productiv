import React from "react"
import { Suspense } from "react"
import Greetings from "@/components/Home/Greetings"
import GreetingsSkeleton from "@/components/Home/Greetings/Skeleton"
import Projects from "@/components/Home/Projects"
import Tasks from "@/components/Home/Projects/Tasks"
import Loading from "@/components/common/Loading"
import TasksLoading from "@/components/Home/Projects/Tasks/Skeleton"

export default function Page() {
  return (
    <div className="h-full overflow-y-auto w-full p-3 items-stretch justify-center min-h-[content]">
      <div className="flex-1 grow flex">
        <Suspense fallback={<GreetingsSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <Greetings />
        </Suspense>
      </div>
      <div className="flex-1 flex grow items-center flex-wrap mt-3">
        <Suspense fallback={<Loading />}>
          {/* @ts-expect-error Server Component */}
          <Projects />
        </Suspense>
      </div>
      <div className="mt-6 flex-2 grow w-full flex">
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
