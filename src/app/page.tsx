'use client'

import { useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col m-0 p-0 bg-primary">
      <button className="py-2 px-8 rounded-xl bg-secondary-100" onClick={
        () => router.push('/api/auth/signout')
      }>Logout</button>
    </main>
  )
}
