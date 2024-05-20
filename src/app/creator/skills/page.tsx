import CreateSkillForm from './components/CreateSkillForm'
import SkillList from './components/SkillList'

export default function SkillsPage () {
  return (
    <div className="p-6 rounded-xl grid grid-cols-2 w-[1024px] gap-5 min-h-[600px] max-h-[600px]">
        <div className="bg-black-200 p-6 rounded-xl">
          <h2 className='text-2xl font-poppins text-white mb-4 font-medium'>Make a new Skill</h2>
          <CreateSkillForm />
        </div>

        <div className="bg-black-200 p-6 rounded-xl max-h-[600px] overflow-hidden">
          <h2 className='text-2xl font-poppins text-white mb-4 font-medium'>Your Skills</h2>

          <SkillList />
        </div>
    </div>
  )
}
