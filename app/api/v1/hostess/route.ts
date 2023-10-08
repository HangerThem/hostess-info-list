import { PrismaClient } from "@prisma/client"
import { getTokenFromServer } from "@/lib/serverAuth"
import { verifyToken } from "@/lib/token"

const prisma = new PrismaClient()

// API endpoint to retrieve all hostesses
export async function GET(req: Request) {
  const token = getTokenFromServer()
  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }
  if (!verifyToken(token)) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }
  const hostesses: Hostess[] = await prisma.hostess.findMany()
  return new Response(JSON.stringify(hostesses), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

// API endpoint to create a new hostess
export async function POST(req: Request) {
  const token = getTokenFromServer()
  if (!token) {
    console.log("no token")
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }
  if (!verifyToken(token)) {
    console.log("invalid token")
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    region,
    age,
    education,
    hairColor,
    height,
    gender,
    image,
  } = await req.json()

  const hostess = await prisma.hostess.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      address,
      region,
      age: Number(age),
      education,
      hairColor,
      height: Number(height),
      gender,
      image,
    },
  })
  return new Response(JSON.stringify(hostess), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
