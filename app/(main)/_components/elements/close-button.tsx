import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
interface Props {
  isMobile: boolean
}
function CloseButton({ isMobile }: Props) {
  return (
    <div
      role='button'
      className={cn(
        'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
        isMobile && 'opacity-100'
      )}
    >
      <ChevronLeft className='h-6 w-6' />
    </div>
  )
}
export default CloseButton
