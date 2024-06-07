'use client'

import { CustomButton } from '@/components'
import { useRouter } from 'next/navigation'

export default function EditStudyPage () {
  const router = useRouter()

  return (
    <div>
      <h1>Edit Study</h1>
      <CustomButton
        title='Go back'
        onClick={() => {
          router.push('/creator/study')
        }}
      />
    </div>
  )
}
