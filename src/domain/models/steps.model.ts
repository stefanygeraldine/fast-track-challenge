export interface IStep {
  answer: string
  question: string
}

export type StepStatus = 'initial' | 'error' | 'success'
