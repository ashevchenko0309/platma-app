'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'py-10 px-12')}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
