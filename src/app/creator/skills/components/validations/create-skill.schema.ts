import { z } from 'zod'

export const createSkillSchema = z.object({
  name: z.string().min(3).max(50),
  // tobe number
  yearsOfExperience: z.string().transform((val) => parseInt(val)),
  logo: z.string().url().optional()
})
