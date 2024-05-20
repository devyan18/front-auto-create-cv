import { API_URL } from '@/common/utils/constants'

export type Skill = {
  skillId?: string
  name: string
  yearsOfExperience: number
  logo?: string
}

export const createNewSkillService = (skill: Skill, access_token: string) => {
  return fetch(`${API_URL}/api/skill`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(skill)
  })
}

export const getSkillsService = (access_token: string) => {
  return fetch(`${API_URL}/api/skill`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
}
