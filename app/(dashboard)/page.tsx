import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/wait";
import { UserButton, currentUser } from "@clerk/nextjs";
import React, { Suspense } from "react";

export default async function Home() {
  return (
   <Suspense fallback={<WelcomeMsgFallback  />}>
    <WelcomeMsg/>
   </Suspense>
  );
}

async function WelcomeMsg(){
  const user = await currentUser();
  await wait(1000);
  if(!user){
    return <div>Not logged in</div>
  }
  return (
   <div className="flex w-full">
    <h1 className="text-4xl font-bold">Welcome,<br/> {user?.firstName}</h1>
   </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[170px] h-[36px]" />
        <Skeleton className="w-[170px] h-[36px]" />
        <Skeleton className="w-[170px] h-[36px]" />
      </h1>
    </div>
  );
}
