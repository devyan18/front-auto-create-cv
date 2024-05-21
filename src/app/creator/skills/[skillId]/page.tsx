'use client'

import { Skill, updateSkillService } from '@/common/services/skills.service'
import { CustomButton, TextField } from '@/components'
import { useSkills } from '@/context/SkillContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createSkillSchema } from '../components/validations/create-skill.schema'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { SkillForm } from '../components/CreateSkillForm'

export default function OneSkillPage () {
  const { skillId } = useParams()
  const [skill, setSkill] = useState<Skill | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  const [isDiff, setDiff] = useState<boolean>(false)

  const { skills, loadSkills } = useSkills()
  const { data } = useSession()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading: isLoadingDefaultValues },
    setValue,
    getValues
  } = useForm<SkillForm>({
    mode: 'onChange',
    resolver: zodResolver(createSkillSchema)
  })

  const onSubmit = async (skillForm: SkillForm) => {
    const access_token = data!.access_token

    if (!access_token) return null

    setLoading(true)

    try {
      await updateSkillService(skillId as string, skillForm, access_token)

      toast.success('Skill created successfully', {
        bodyClassName: 'text-white font-poppins font-regular',
        style: {
          backgroundColor: '#1E1E2D'
        }
      })

      loadSkills()
      setDiff(false)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create skill')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (skills) {
      const foundSkill = skills.find((s) => s.skillId === skillId)
      if (foundSkill) {
        setSkill(foundSkill)

        setValue('name', foundSkill.name)
        setValue('yearsOfExperience', foundSkill.yearsOfExperience.toString())
        setValue('logo', foundSkill.logo || '')
      }
    }
  }, [skills, skillId, setValue])

  useEffect(() => {
    // verify if the form has been changed
  }, [skills, skillId, setValue, getValues, skill])

  if (!skill) {
    return (
      <div className="w-[400px] h-[600px] bg-black-100 rounded-lg">
        <h2 className="text-3xl text-white">Loading...</h2>
      </div>
    )
  }

  return (
    <div className="w-[600px] h-[600px] bg-black-200 rounded-xl py-6 px-8">
      <div className="flex flex-row gap-4 mt-4">
        <img src={skill.logo} alt={skill.name} className="h-16" />
        <div className="self-center">
          <h2 className="text-3xl text-white font-poppins">{skill.name}</h2>
          <p className="text-lg text-gray-400 font-poppins font-regular">
            {skill.yearsOfExperience} years of experience
          </p>
        </div>
        <div className="flex-1 flex items-start p-2 justify-end">
          <button
            onClick={
              () => router.push('/creator/skills')
            }
            className="text-secondary-200 hover:text-secondary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
              />
            </svg>
          </button>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 mt-6 min-w-72"
        onSubmit={handleSubmit(onSubmit)}
        onChange={(e) => {
          const name = getValues('name')
          const yearsOfExperience = getValues('yearsOfExperience')
          const logo = getValues('logo')

          console.log({
            name: skill.name,
            yearsOfExperience: skill.yearsOfExperience,
            logo: skill.logo
          })
          console.log({ name, yearsOfExperience, logo })

          if (!skill) return

          if (
            name !== skill.name ||
            yearsOfExperience !== skill.yearsOfExperience.toString() ||
            logo !== skill.logo
          ) {
            setDiff(true)
            return
          }

          setDiff(false)
        }}
      >
        <TextField
          labelTheme="light"
          label="Skill Name"
          placeholder='e.g. "React"'
          name="name"
          register={register}
          errors={errors.name}
          disabled={isLoadingDefaultValues || isLoading}
        />
        <TextField
          labelTheme="light"
          label="Years of Experience"
          placeholder='e.g. "3"'
          name="yearsOfExperience"
          register={register}
          errors={errors.yearsOfExperience}
          disabled={isLoadingDefaultValues || isLoading}
        />
        <TextField
          labelTheme="light"
          label="Logo URL"
          placeholder='e.g. "https://example.com/logo.png"'
          name="logo"
          register={register}
          errors={errors.logo}
          disabled={isLoadingDefaultValues || isLoading}
        />
        <CustomButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10.925 14.05L16.6 8.4l-1.425-1.425l-4.25 4.25L8.8 9.1l-1.4 1.4zM1 21v-2h22v2zm3-3q-.825 0-1.412-.587T2 16V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v11q0 .825-.587 1.413T20 18z"
              />
            </svg>
          }
          disabled={!isDiff}
          type="submit"
          onClick={() => {}}
          isLoading={isLoading}
          title="Save"
          otherStyles="self-start w-32"
        />
      </form>
    </div>
  )
}
