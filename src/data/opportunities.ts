export interface Opportunity {
  id: string
  title: string
  type: string
  location: string
  experience: string
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

export const opportunities: Opportunity[] = []
