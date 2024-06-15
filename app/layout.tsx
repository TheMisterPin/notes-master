import { Toaster } from 'sonner'
import { Indie_Flower } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
// import { ModalProvider } from "@/components/providers/modal-provider";
// import { EdgeStoreProvider } from "@/lib/edgestore";

import './globals.css'

const inter = Indie_Flower({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Note-Hub',
  description: 'Boost your productivity',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon.png',
        href: '/icon.png'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          {/* <EdgeStoreProvider> */}
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            storageKey='Notes Hub-theme-2'
          >
            <Toaster position='bottom-center' />
            {/* <ModalProvider /> */}
            {children}
          </ThemeProvider>
          {/* </EdgeStoreProvider> */}
        </ConvexClientProvider>
      </body>
    </html>
  )
}
