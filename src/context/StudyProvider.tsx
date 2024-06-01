'use client'

import { Study, getStudiesService } from '@/common/services/study.service'
import { useSession } from 'next-auth/react'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback
} from 'react'

export type StudyContextProps = {
  study: Study[];
  loadStudy: () => void;
};

const StudyContext = createContext<StudyContextProps>({
  study: [],
  loadStudy: () => null
})

export const useStudy = () => useContext(StudyContext)

type Props = {
  children: ReactNode;
};

export const StudyProvider = (props: Props) => {
  const [studies, setStudies] = useState<Study[]>([])

  const { data } = useSession()

  const loadStudy = useCallback(async () => {
    if (!data?.access_token) return

    const req = await getStudiesService(data?.access_token)
    if (!req.ok) return console.error('Failed to fetch studies')

    const res = await req.json()

    setStudies(res)
  }, [data])

  useEffect(() => {
    loadStudy()
  }, [loadStudy])

  return (
    <StudyContext.Provider value={{ study: studies, loadStudy }}>
      {props.children}
    </StudyContext.Provider>
  )
}
