import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';

interface Props {
    open: boolean;
    onOpenChnage: (open: boolean) => void;
}

const CreateCollectionSheet = ({ open, onOpenChnage }: Props) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChnage}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        Add new collections
                    </SheetTitle>
                    <SheetDescription>
                        Collections are a way to group your tasks
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet