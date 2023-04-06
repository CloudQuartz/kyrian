'use client'

import '@/base/styles/globals.css'
import '@kyrian/ui/styles.css'
import { type FC, type PropsWithChildren } from 'react'
import { Inter } from '@next/font/google'

import { api } from '~/utils/api'

const inter = Inter({ subsets: ['latin'] })

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default api.withTRPC(RootLayout)
