import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CreateLayout ({ children }: Props) {
  return (
      <main className="min-h-screen w-scren flex flex-col justify-center items-center bg-primary">
        {children}
      </main>
  )
}
