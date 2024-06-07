'use client'

import { useRouter } from 'next/navigation'
import CreateSkillForm from './components/CreateSkillForm'
import SkillList from './components/SkillList'

export default function SkillsPage () {
  const router = useRouter()

  return (
    <div className="p-6 rounded-xl grid grid-cols-2 w-[1024px] gap-5 min-h-[600px] max-h-[600px]">
      <div className="bg-black-200 p-6 rounded-xl">
        <div className="flex flex-row justify-between items-start">
          <h2 className="text-2xl font-poppins text-white mb-4 font-medium">
            Make a new Skill
          </h2>
          <button
            onClick={() => router.push('/creator')}
            className="text-secondary-200 hover:text-secondary-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
              />
            </svg>
          </button>
        </div>
        <CreateSkillForm />
      </div>

      <div className="bg-black-200 p-6 rounded-xl max-h-[600px] overflow-hidden">
        <h2 className="text-2xl font-poppins text-white mb-4 font-medium">
          Your Skills
        </h2>

        <SkillList />
      </div>
    </div>
  )
}
