'use client'

import { deleteSkillService } from '@/common/services/skills.service'
import { useSkills } from '@/context/SkillContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

type Props = {
  skillId: string;
  name: string;
  logo: string;
  yearsOfExperience: number;
};

export default function SkillItem ({
  skillId,
  name,
  logo,
  yearsOfExperience
}: Props) {
  const { loadSkills } = useSkills()
  const { data } = useSession()
  const router = useRouter()

  const handleDeleteSkill = async () => {
    try {
      await deleteSkillService(skillId, data!.access_token)

      console.log('Skill deleted')

      toast.success('Skill deleted')
    } catch (error) {
      console.error(error)
      toast.error('Error deleting skill')
    } finally {
      loadSkills()
    }
  }

  const handleEditSkill = () => {
    router.push(`/creator/skills/${skillId}`)
  }

  return (
    <div className="flex items-center gap-4 justify-start p-2 hover:bg-black-100 rounded-lg">
      <motion.img
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
        src={logo}
        alt={name}
        className="w-[40px] rounded-xl object-contain select-none"
      />
      <div className="flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="text-lg font-semibold text-white select-none"
        >
          {name}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="text-sm font-light text-gray-400 select-none"
        >
          {yearsOfExperience} years of experience
        </motion.p>
      </div>

      <div className="flex-1 flex flex-row gap-4 place-self-center justify-end items-center">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="text-yellow-300 hover:text-yellow-500"
          onClick={() => {
            handleEditSkill()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
            </g>
          </svg>
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.1 } }}
          className="text-red-500 hover:text-red-700"
          onClick={handleDeleteSkill}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
  )
}
