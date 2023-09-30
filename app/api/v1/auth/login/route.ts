import { PrismaClient } from "@prisma/client"
import { generateToken } from "@/lib/token"
import { compare } from "bcryptjs"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) {
    return new Response(JSON.stringify({ message: "Login failed" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const valid = await compare(password, user.password)
  if (!valid) {
    return new Response(JSON.stringify({ message: "Login failed" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  const token = generateToken({
    id: user.id,
  })

  return new Response(
    JSON.stringify({
      message: "Login successful",
      success: true,
      token,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  )
}
