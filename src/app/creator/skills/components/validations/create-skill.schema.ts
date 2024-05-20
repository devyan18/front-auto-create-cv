import { z } from 'zod'

export const createSkillSchema = z.object({
  name: z.string().min(3).max(50),
  yearsOfExperience: z.string().min(1).max(2).transform(value => parseInt(value)),
  logo: z.string().url().optional()
})
