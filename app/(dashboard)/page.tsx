import SadFace from "@/components/icons/SadFace";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import React, { Suspense } from "react";
import prisma from "@/lib/prisma";
import CreateCollectionButton from "@/components/CreateCollectionButton";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading Collections...</div>}>
        <CollectionList />
      </Suspense>

    </>

  );
}

async function WelcomeMsg() {
  const user = await currentUser();
  await wait(1000);
  if (!user) {
    return <div>Not logged in</div>
  }
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">Welcome,<br /> {user?.firstName}</h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl flex flex-col gap-3 font-bold">
        <Skeleton className="w-[170px] h-[36px]" />
        <Skeleton className="w-[170px] h-[36px]" />
      </h1>
    </div>
  );
}


async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma?.collection.findMany({
    where: {
      userId: user?.id
    }
  });

  if (collections?.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertTitle>Create a collection to get started</AlertTitle>
        </Alert>
        <CreateCollectionButton />
      </div>

    )
  }
}

