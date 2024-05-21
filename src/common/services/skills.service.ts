import { SkillForm } from '@/app/creator/skills/components/CreateSkillForm'
import { API_URL } from '@/common/utils/constants'

export type Skill = {
  skillId?: string
  name: string
  yearsOfExperience: number
  logo?: string
}

export const createNewSkillService = (skill: SkillForm, access_token: string) => {
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

export const deleteSkillService = (skillId: string, access_token: string) => {
  return fetch(`${API_URL}/api/skill/${skillId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const updateSkillService = (skillId: string, skill: SkillForm, access_token: string) => {
  return fetch(`${API_URL}/api/skill/${skillId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(skill)
  })
}

export const getOneSkillService = async (skillId: string, access_token: string) => {
  const request = await fetch(`${API_URL}/api/skill/${skillId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })

  if (!request.ok) {
    console.log('Failed to fetch skill')
    return {
      name: '',
      yearsOfExperience: 0,
      logo: ''
    }
  }

  const response = await request.json()

  return response as Skill
}
