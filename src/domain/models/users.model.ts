export interface IUser {
  email: string
  hasCompletedGame: boolean
  correctAnswers: number
}
export interface IUsersModel {
  users: IUser[]
}
