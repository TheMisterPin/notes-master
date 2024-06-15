import Image from 'next/image'
import { Permanent_Marker, Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const font = Permanent_Marker({
  subsets: ['latin'],
  weight: ['400']
})

export const Logo = () => {
  return (
    <div className='hidden md:flex items-center gap-x-2'>
      <Image src='/icon.png' height='40' width='40' alt='Logo' />
      <p className={cn('font-semibold w-64', font.className)}> Notes Master</p>
    </div>
  )
}
