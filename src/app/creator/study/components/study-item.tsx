import { Study } from '@/common/services/study.service'

export default function StudyItem ({ data }: {data: Study}) {
  return (
    <div>
      <h1 className='text-white font-poppins font-medium'>{data.title}</h1>
    </div>
  )
}
