// import { Study } from '@/common/services/study.service'
import { z } from 'zod'

export const createStudySchema = z
  .object({
    title: z.string().trim().min(3).max(50),
    level: z.enum(['pregrade', 'grade', 'postgrade', 'master', 'doctorate']),
    status: z.enum(['ended', 'process']),
    startDate: z
      .string()
      .trim()
      .min(3)
      .max(50)
      .transform((e) => {
        const date = new Date(e)
        return date.toISOString()
      }),
    endDate: z
      .string()
      .trim()
      .min(3)
      .max(50)
      .transform((e) => {
        const date = new Date(e)
        return date.toISOString()
      })
      .or(z.null())
      .default(null)
  })
  .refine(
    (data) => {
      if (data.endDate) {
        if (new Date(data.startDate) >= new Date(data.endDate)) {
          return false
        }
      }

      if (data.status === 'process') {
        data.endDate = null
      } else {
        if (!data.endDate) {
          return false
        }
      }

      return true
    },
    {
      message: 'The end date must be greater than the start date',
      path: ['endDate']
    }
  )
