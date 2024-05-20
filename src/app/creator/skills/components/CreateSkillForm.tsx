'use client'

import { CustomButton, TextField } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createSkillSchema } from './validations/create-skill.schema'
import { useState } from 'react'
import { createNewSkillService } from '@/common/services/skills.service'
import { useSession } from 'next-auth/react'
import { useSkills } from '@/context/SkillContext'
import { toast } from 'react-toastify'

export type SkillForm = {
  name: string
  yearsOfExperience: number
  logo: string
}

export default function CreateSkillForm () {
  const [isLoading, setLoading] = useState<boolean>(false)

  const { data } = useSession()
  const { loadSkills } = useSkills()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<SkillForm>({
    resolver: zodResolver(createSkillSchema)
  })

  const onSubmit = async (values: SkillForm) => {
    setLoading(true)

    const token = data!.access_token
    if (!token) return null
    try {
      const request = await createNewSkillService(values, token)
      if (!request.ok) throw new Error('Failed to create skill')

      const response = await request.json()

      console.log(response)
      toast.success('Skill created successfully', {
        bodyClassName: 'text-white font-poppins font-regular',
        style: {
          backgroundColor: '#1E1E2D'
        }
      })
    } catch (error) {
      console.error(error)
      alert('Failed to create skill')
    } finally {
      setLoading(false)
      reset()

      loadSkills()
    }
  }

  return (
    <form
    className='flex flex-col gap-4 mt-6 min-w-72'
    onSubmit={handleSubmit(onSubmit)}>

      <TextField
        labelTheme='light'
        label="Skill Name"
        placeholder='e.g. "React"'
        name='name'
        register={register}
        errors={errors.name}
        disabled={isLoading}
      />
      <TextField
        labelTheme='light'
        label="Years of Experience"
        placeholder='e.g. "3"'
        name='yearsOfExperience'
        register={register}
        errors={errors.yearsOfExperience}
        disabled={isLoading}
      />
      <TextField
        labelTheme='light'
        label="Logo URL"
        placeholder='e.g. "https://example.com/logo.png"'
        name='logo'
        register={register}
        errors={errors.logo}
        disabled={isLoading}
      />
      <CustomButton
        disabled={isLoading}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6v2H5v14h14v-6h2v6q0 .825-.587 1.413T19 21zm11-10V8h-3V6h3V3h2v3h3v2h-3v3z"/></svg>
        }
        type='submit'
        onClick={() => {}}
        isLoading={false}
        title='Create'
        otherStyles='self-start w-32'
      />
    </form>
  )
}
