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

export async function deleteCollection(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new Error("user not found")
    }

    return await prisma.collection.delete({
        where: {
            id: id,
            userId: user.id
        }
    })
}