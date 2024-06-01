'use client'

import { Study } from '@/common/services/study.service'
import SearchField from '@/components/SearchField'
import { useStudy } from '@/context/StudyProvider'
import { useState } from 'react'
import StudyItem from './study-item'

export default function StudyList () {
  const [searchText, setSearchText] = useState<string>('')

  const { study } = useStudy()

  // select from title or from level
  const studySearchFilter = (study: Study[]) => {
    return study.filter((study) => {
      return (
        study.title.toLowerCase().includes(searchText.toLowerCase()) ||
        study.level.toLowerCase().includes(searchText.toLowerCase())
      )
    })
  }

  return (
    <div className="bg-black-200 rounded-xl">
      <div className="w-full bg-black-200 p-4 px-8 pt-8 rounded-t-xl">
        <SearchField
          onChange={(e) => setSearchText(e.target.value)}
          name="search"
          label="Search"
          placeholder="🔍 Search for a study"
          value={searchText}
        />
        <hr className="h-px mt-3 bg-gray-600 border-0" />
      </div>
      <div className="px-6">
        {studySearchFilter(study).map((study) => {
          return <StudyItem key={study.studyId} data={study} />
        })}
      </div>
    </div>
  )
}
