'use client'

import { useSkills } from '@/context/SkillContext'
import SkillItem from './SkillItem'
import { useEffect, useState } from 'react'
import { Skill } from '@/common/services/skills.service'

export default function SkillList () {
  const [searchSkills, setSearchSkills] = useState<string>('')
  const [matchOfSkills, setMatchOfSkills] = useState<Skill[]>([])

  const { skills } = useSkills()

  useEffect(() => {
    if (searchSkills === '') {
      setMatchOfSkills(skills)
      return
    }

    const filteredSkills = skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchSkills.toLowerCase())
    )

    setMatchOfSkills(filteredSkills)
  }, [searchSkills, skills])

  return (
    <>
      <input
        className={`
        w-full
        p-2
        bg-black-100
        text-white
        rounded-lg
        focus:outline-none
        border-2
        border-black-100
        focus:border-secondary
        mb-4
      `}
        type="text"
        placeholder="Search: Python"
        name="search"
        value={searchSkills}
        onChange={(e) => setSearchSkills(e.target.value)}
      />
      <div className="overflow-hidden max-h-[440px] scroll-smooth hover:overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-black-100 scrollbar-track-black-200">
        {matchOfSkills.map((skill) => (
          <SkillItem
            key={skill.skillId}
            skillId={skill.skillId || ''}
            name={skill.name}
            logo={skill.logo || ''}
            yearsOfExperience={skill.yearsOfExperience}
          />
        ))}
      </div>
    </>
  )
}
