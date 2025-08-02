export interface IUserAuthResponse {
  accessToken: string
  email: string
  firstName: string
  gender: "male" | "female"
  id: number
  image: string
  lastName: string
  refreshToken: string
  username: string
}

type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export type IUser = Omit<Nullable<IUserAuthResponse>, "accessToken" | "refreshToken">

export interface IAuth {
  username: string
  password: string
}

export interface IRefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
