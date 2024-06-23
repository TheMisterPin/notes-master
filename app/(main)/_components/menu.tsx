'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton';

interface MenuProps {
  documentId: Id<'documents'>
}

function Menu({ documentId }: MenuProps) {
  const router = useRouter()
  const { user } = useUser()
  const archive = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archive({ id: documentId })
    router.push('/documents')
    toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted!',
      error: 'Error Deleting document'
    })
    router.push('/documents')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60' align='end' alignOffset={0} forceMount>
        <DropdownMenuItem onClick={onArchive}>
          <Trash className='h-4 w-4 mr-2' />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'> Last Edited by: {user?.fullName}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className='h-10 w-10'/>
    )
}

export default Menu
