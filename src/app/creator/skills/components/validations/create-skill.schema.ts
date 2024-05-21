import { z } from 'zod'

export const createSkillSchema = z.object({
  name: z.string().trim().min(3).max(50),
  // tobe number
  yearsOfExperience: z.string().min(1).trim().transform((val) => parseInt(val)),
  logo: z.string().trim().url().optional()
})
