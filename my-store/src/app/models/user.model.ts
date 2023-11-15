export interface User{
  id: string
  email: string
  password: string
  name: string,
  avatar: string
  role: 'customer' | 'admin'
}

export type CreateUserDTO = Omit<User, 'id'>
