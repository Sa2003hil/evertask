import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from './ui/sheet'
import { useForm } from 'react-hook-form'
import {
    createCollectionSchema,
    CreateCollectionSchemaType
} from '@/schema/createCollection'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from './ui/form'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'
import { cn } from '@/lib/utils'
import { CollectionColors } from '@/lib/constants'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { on } from 'stream'
import { createCollection } from '@/actions/collection'
import { toast } from './ui/use-toast'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

interface Props {
    open: boolean
    onOpenChnage: (open: boolean) => void
}

const CreateCollectionSheet = ({ open, onOpenChnage }: Props) => {

    const router = useRouter();

    const form = useForm<CreateCollectionSchemaType>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {}
    })

    const onSubmit = async (data: CreateCollectionSchemaType) => {
        try {
            await createCollection(data)
            // Close the sheet
            openChangeWrapper(false)
            router.refresh();

            // show toast
            toast({
                title: 'Success',
                description: 'Collection created successfully'
            })
        } catch (error: any) {
            // show toast
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            })

            console.log('error ', error)
        }
    }
    // Reset the Form status
    const openChangeWrapper = (open: boolean) => {
        form.reset()
        onOpenChnage(open)
    }



    return (
        <Sheet open={open} onOpenChange={openChangeWrapper}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add new collections</SheetTitle>
                    <SheetDescription>
                        Collections are a way to group your tasks
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 flex flex-col '
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Personal' {...field} />
                                    </FormControl>
                                    <FormDescription>Collection name</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='color'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={color => field.onChange(color)}>
                                            <SelectTrigger
                                                className={cn(
                                                    'w-full h-8 text-white',
                                                    CollectionColors[field.value as CollectionColors]
                                                )}
                                            >
                                                <SelectValue
                                                    placeholder='color'
                                                    className='w-full h-8'
                                                />
                                            </SelectTrigger>
                                            <SelectContent className='w-full'>
                                                {Object.keys(CollectionColors).map(color => (
                                                    <SelectItem
                                                        key={color}
                                                        value={color}
                                                        className={cn(
                                                            `w-full h-8 rounded-md my-1 text-white focous:text-white focus:font-bold focus:ring-2 focus:ring-inset dark:focus:ring-white focus:px-8`,
                                                            CollectionColors[color as CollectionColors]
                                                        )}
                                                    >
                                                        {color}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Select a color for your collection
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <div className='flex flex-col gap-3 mt-4'>
                    <Separator />
                    <Button
                        disabled={form.formState.isSubmitting}
                        variant='outline'
                        className={cn(
                            form.watch('color') &&
                            CollectionColors[form.getValues('color') as CollectionColors]
                        )}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        Confirm
                        {/* adding spinner */}
                        {form.formState.isSubmitting && (
                            <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateCollectionSheet
