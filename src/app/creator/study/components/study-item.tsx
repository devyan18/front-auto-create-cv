'use client'

import { Study, deleteStudyService } from '@/common/services/study.service'
import { useStudy } from '@/context/StudyProvider'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type Levels =
  | 'grade'
  | 'pregrade'
  | 'postgrade'
  | 'master'
  | 'doctorate'
  | 'courses';

const Level = ({ level }: { level: Levels }) => {
  const colors = {
    grade: 'bg-blue-600 text-white',
    pregrade: 'bg-green-600 text-white',
    postgrade: 'bg-yellow-600 text-black-200 font-normal',
    master: 'bg-red-600 text-white',
    doctorate: 'bg-purple-600 text-white',
    courses: 'bg-gray-600 text-black-200'
  }

  return (
    <span
      className={`font-poppins font-light text-xs select-none rounded-lg px-2 ${colors[level]}`}
    >
      {capitalize(level)}
    </span>
  )
}

export default function StudyItem ({ data }: { data: Study }) {
  const { data: session } = useSession()
  const { loadStudy } = useStudy()
  const router = useRouter()

  const handleDeleteStudy = async () => {
    if (!session?.access_token) {
      return
    }

    try {
      const req = await deleteStudyService(session.access_token as string, data.studyId as string)

      if (!req.ok) {
        console.error('Failed to delete study')

        throw new Error('Failed to delete study')
      }

      toast.success('Study deleted successfully')
    } catch (error) {
      console.error(error)
      toast.error('Error deleting study')
    } finally {
      loadStudy()
    }
  }

  const handleEditStudy = () => {
    router.push(`/creator/study/${data.studyId}`)
  }

  return (
    <div className="bg-black-100 border-2 border-black-100 rounded-lg py-2 px-4 flex flex-row justify-between">
      <div className='flex flex-col gap-1'>
        <p className="text-white font-poppins font-medium text-base select-none">
          {capitalize(data.title)}
        </p>
        <p className="text-gray-400 font-poppins font-light text-xs select-none">
          <Level level={data.level as Levels} />
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.05 } }}
        >
          {data.status === 'ended'
            ? (
            <span className="text-black-100 font-poppins font-light text-xs select-none rounded-lg px-2 bg-green-600">
              Ended
            </span>
              )
            : (
            <span className="text-black-100 font-poppins font-light text-xs select-none rounded-lg px-2 bg-amber-600 ">
              In process
            </span>
              )}
        </motion.p>

        <div className="flex flex-row gap-2">
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.05 } }}
            className="text-amber-500 hover:text-yellow-500"
            onClick={() => {
              handleEditStudy()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
              </g>
            </svg>
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { delay: 0.05 } }}
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              handleDeleteStudy()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21V6H4V4h5V3h6v1h5v2h-1v15zm2-2h10V6H7zm2-2h2V8H9zm4 0h2V8h-2zM7 6v13z"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
