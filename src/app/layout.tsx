import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import MySessionProvider from '@/context/SessionProvider'
import fontLocal from 'next/font/local'
import SkillProvider from '@/context/SkillContext'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { StudyProvider } from '@/context/StudyProvider'

export const metadata: Metadata = {
  title: 'Create Your CV',
  description: 'Create your CV with ease. Choose from multiple templates and download your CV as a PDF.'
}

const Poppins = fontLocal({
  src: [
    {
      path: '../fonts/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-Thin.ttf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-ExtraLight.ttf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-Black.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../fonts/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    }
  ],
  variable: '--poppins'
})

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Poppins.variable} font-sans bg-primary`}>
        <MySessionProvider>
          <SkillProvider>
            <StudyProvider>
              {children}
            </StudyProvider>
          </SkillProvider>
        </MySessionProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
}
