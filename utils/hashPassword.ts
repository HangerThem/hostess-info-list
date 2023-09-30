import { hash, genSalt } from "bcryptjs"

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10)
  return hash(password, salt)
}
