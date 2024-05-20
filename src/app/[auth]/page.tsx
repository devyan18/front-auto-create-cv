'use client'

import { CustomButton } from '@/components'
import { useRouter } from 'next/navigation'

export default function AuthPage () {
  const router = useRouter()

  return (
    <>
      <h1 className="text-white font-bold text-4xl">Auth Page</h1>
      <section className="flex flex-col border-2 p-4 rounded-lg mt-4 border-black-200 items-center gap-6">
        <h2 className="text-white text-base">Select Start Method</h2>

        <div className="flex flex-row gap-4">
          <CustomButton
            title="Login"
            disabled={false}
            onClick={() => {
              router.push('/auth/login')
            }}
          />
          <CustomButton
            title="Register"
            disabled={false}
            onClick={() => {
              router.push('/auth/login')
            }}
          />
        </div>
      </section>
    </>
  )
}
