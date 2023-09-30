import jwt from "jsonwebtoken"

interface TokenPayload {
  id: string
}

interface DecodedToken {
  id: string
  iat: number
  exp: number
}

export const generateToken = (payload: TokenPayload) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set")
  }
  return jwt.sign(payload, secret, { expiresIn: "1d" })
}

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set")
  }
  try {
    const decoded: DecodedToken = jwt.verify(token, secret) as DecodedToken
    return decoded
  } catch (error) {
    throw new Error("Invalid token: " + error)
  }
}
