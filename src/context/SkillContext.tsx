'use client'

import { createContext, useState, useEffect, ReactNode, useCallback, useContext } from 'react'
import { Skill, getSkillsService } from '@/common/services/skills.service'
import { useSession } from 'next-auth/react'

type SkillContextProps = {
  skills: Skill[];
  loadSkills: () => void;
};

const SkillContext = createContext<SkillContextProps>({
  skills: [],
  loadSkills: async () => {}
})

type Props = {
  children: ReactNode;
};

export default function SkillProvider ({ children }: Props) {
  const { data } = useSession()
  const [skills, setSkills] = useState<Skill[]>([])

  const loadSkills = useCallback(async () => {
    const token = data!.access_token
    if (!token) return null

    try {
      const request = await getSkillsService(token)
      if (!request.ok) throw new Error('Failed to fetch skills')

      const response = await request.json()

      setSkills(response)
    } catch (error) {
      console.error(error)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      loadSkills()
    }
  }, [data, loadSkills])

  return (
    <SkillContext.Provider
      value={{ skills, loadSkills }}
    >
      {children}
    </SkillContext.Provider>
  )
}

export const useSkills = () => useContext(SkillContext)
