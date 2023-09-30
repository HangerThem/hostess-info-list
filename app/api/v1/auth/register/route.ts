import { PrismaClient } from "@prisma/client"
import { hashPassword } from "@/utils/hashPassword"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  const prisma = new PrismaClient()

  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
    },
  })

  return new Response(
    JSON.stringify({
      message: "Registration successful",
      success: true,
      user,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  )
}
