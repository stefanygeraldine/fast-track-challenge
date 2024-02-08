export interface IStep {
  answer: string
  question: string
}

export interface IStepSummary extends IStep {
  image?: string
  background?: string
}

export type StepStatus = 'initial' | 'error' | 'success'
