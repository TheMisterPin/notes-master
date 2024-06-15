'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

function DocumentsPage() {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: 'Untitled' })
    toast.promise(promise, {
      loading: 'Creating...',
      success: 'Created!',
      error: 'Error'
    })
  }
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src='/empty.png' width={200} height={200} alt='empty' />
      <h2>Welcome to {user?.firstName}&apos;s Notes </h2>
      <Button onClick={onCreate} className='bg-[#044074]'>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a new note
      </Button>
    </div>
  )
}
export default DocumentsPage
