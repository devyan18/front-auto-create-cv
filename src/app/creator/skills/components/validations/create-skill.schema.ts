import { z } from 'zod'

export const createSkillSchema = z.object({
  name: z.string().min(3).max(50),
  // tobe number
  yearsOfExperience: z.number(),
  logo: z.string().url().optional()
})
