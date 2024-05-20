import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Your CV - Auth',
  description:
    'Create your CV with ease. Choose from multiple templates and download your CV as a PDF.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen bg-primary justify-center items-center text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
