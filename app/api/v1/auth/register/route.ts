import { PrismaClient } from "@prisma/client"
import { hashPassword } from "@/utils/hashPassword"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  // return new Response(
  //   JSON.stringify({
  //     message: "Registration failed",
  //     success: false,
  //   }),
  //   {
  //     status: 503,
  //     headers: { "content-type": "application/json" },
  //   }
  // )
  const { username, password } = await req.json()

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
