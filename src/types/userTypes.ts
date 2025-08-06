export interface UserAuthResponse {
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

export type User = Omit<Nullable<UserAuthResponse>, "accessToken" | "refreshToken">

export interface Auth {
  username: string
  password: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}

export interface AllUsersResponse {
  users: (User & Auth)[]
  total: number
}
