'use client'

import { Study, createStudyService } from '@/common/services/study.service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createStudySchema } from '../validations/create-study-schema'
import { CustomButton, TextField } from '@/components'
import SelectField from '@/components/SelectField'
import DateField from '@/components/DateField'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useStudy } from '@/context/StudyProvider'

export default function StudyForm () {
  const [isLoading, setLoading] = useState(false)

  const { loadStudy } = useStudy()

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
    watch,
    resetField,
    getValues,
    reset
  } = useForm<Study>({
    resolver: zodResolver(createStudySchema)
  })

  const { data } = useSession()

  const onSubmit = async (formData: Study) => {
    const access_token = data?.access_token

    if (!access_token) return

    setLoading(true)

    try {
      const req = await createStudyService(access_token, formData)

      if (!req.ok) {
        console.error('Failed to create study')

        throw new Error('Failed to create study')
      }

      const response = await req.json()

      console.log(response)

      toast.success('Study created successfully')
    } catch (error) {
      console.log(error)
      toast.error('Failed to create study')
    } finally {
      clearErrors()
      setLoading(false)
      loadStudy()

      reset()
    }
  }

  useEffect(() => {
    resetField('endDate')
  }, [watch, getValues('status'), clearErrors])

  console.log({ isLoading, errors })

  return (
    <div className="bg-black-200 rounded-xl">
      <div className="rounded-t-xl">
        <h1 className="text-2xl font-poppins text-white font-medium pt-6 px-6 flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m227.79 52.62l-96-32a11.85 11.85 0 0 0-7.58 0l-96 32A12 12 0 0 0 20 63.37a6.05 6.05 0 0 0 0 .63v80a12 12 0 0 0 24 0V80.65l23.71 7.9a67.92 67.92 0 0 0 18.42 85A100.36 100.36 0 0 0 46 209.44a12 12 0 1 0 20.1 13.11C80.37 200.59 103 188 128 188s47.63 12.59 61.95 34.55a12 12 0 1 0 20.1-13.11a100.36 100.36 0 0 0-40.18-35.92a67.92 67.92 0 0 0 18.42-85l39.5-13.17a12 12 0 0 0 0-22.76Zm-99.79-8L186.05 64L128 83.35L70 64ZM172 120a44 44 0 1 1-81.06-23.71l33.27 11.09a11.89 11.89 0 0 0 7.58 0l33.27-11.09A43.85 43.85 0 0 1 172 120"
            />
          </svg>
          <span>Make a new Study for you</span>
        </h1>
      </div>
      <hr className="h-px mt-3 bg-gray-600 border-0" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[500px] overflow-auto pt-2 pb-6 px-6 scroll-smooth overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-black-100 hover:scrollbar-thumb-black-100 scrollbar-track-black-200"
      >
        <TextField
          labelTheme="light"
          name="title"
          label="Title of Study"
          placeholder="e.g: Software Engineering"
          register={register}
          errors={errors.title}
        />

        <SelectField
          labelTheme="light"
          label="Level of Study"
          name="level"
          options={[
            { label: 'Pregrade', value: 'pregrade' },
            { label: 'Grade', value: 'grade' },
            { label: 'Postgrade', value: 'postgrade' },
            { label: 'Master', value: 'master' },
            { label: 'Doctorate', value: 'doctorate' }
          ]}
          register={register}
          errors={errors.level}
        />

        <DateField
          labelTheme="light"
          label="Date of start study"
          name="startDate"
          register={register}
          errors={errors.startDate}
        />

        <SelectField
          labelTheme="light"
          label="You are ended this study?"
          name="status"
          options={[
            { label: 'No', value: 'process' },
            { label: 'Yes', value: 'ended' }
          ]}
          register={register}
          errors={errors.status}
        />

        {watch('status') === 'ended' && (
          <DateField
            labelTheme="light"
            label="Date of end study"
            name="endDate"
            register={register}
            errors={errors.endDate}
          />
        )}
        <div className="mt-6"></div>
        <CustomButton
          disabled={isLoading || Object.keys(errors).length > 0}
          isLoading={isLoading}
          type="submit"
          onClick={() => {}}
          title="Make Study"
        />
      </form>
    </div>
  )
}
