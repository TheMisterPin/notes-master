import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface BannerProps {
  documentId: Id<'documents'>
}

function Banner({ documentId }: BannerProps) {
  const router = useRouter()
  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)
  const onRemove = () => {
    const promise = remove({ id: documentId })
    router.push('/documents')

    toast.promise(promise, {
      loading: 'Removing...',
      success: 'Removed!',
      error: 'Error removing document'
    })
  }
  const onRestore = () => {
    const promise = restore({ id: documentId })

    toast.promise(promise, {
      loading: 'Removing...',
      success: 'Removed!',
      error: 'Error removing document'
    })
  }
  return (
    <>
      <div className='w-full bg-rose-500 text-center text-white text-sm p-2 flex items-center gap-x-2 justify-center'>
        <p>This Note has been deleted!</p>
        <Button
          size='sm'
          variant='outline'
          onClick={onRestore}
          className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
        >
          Restore this note
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size='sm'
            variant='outline'
            onClick={onRemove}
            className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
          >
            Delete forever
          </Button>
        </ConfirmModal>
      </div>
    </>
  )
}

export default Banner
