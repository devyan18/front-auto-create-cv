import StudyList from './components/study-list'
import StudyForm from './components/study-form'

export default function StudyPage () {
  return (
    <div className="max-w-[768px] w-full lg:w-full lg:max-w-[1024px] h-[580px] grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 grid-cols-1 rounded-xl gap-4">
      <StudyForm />
      <StudyList />
    </div>
  )
}
