import { API_URL } from '@/common/utils/constants'

export type Study = {
  studyId?: string,
  title: string,
  level: string,
  status: string,
  startDate: string,
  endDate: string | null,
}

export const getStudiesService = (access_token: string) => {
  return fetch(`${API_URL}/api/studies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const createStudyService = (access_token: string, study: Study) => {
  return fetch(`${API_URL}/api/studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(study)
  })
}

export const deleteStudyService = (access_token: string, studyId: string) => {
  return fetch(`${API_URL}/api/studies/${studyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
}
