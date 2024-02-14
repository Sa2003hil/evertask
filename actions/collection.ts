"use server";

import { CreateCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function createCollection(from:CreateCollectionSchemaType){
    const user = await currentUser();

    if(!user){
        throw new Error('User not found');
    }

    return await prisma.collection.create({
        data:{
            userId: user.id,
            color: from.color,
            name: from.name,
        }
    })
}