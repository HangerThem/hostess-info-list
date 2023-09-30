import { PrismaClient } from "@prisma/client"
import { getTokenFromServer } from "@/lib/serverAuth"
import { verifyToken } from "@/lib/token"

// API endpoint to retrieve specific hostess by id
export async function GET(req: Request) {
  const id = req.url.split("/")[6]
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
  const prisma = new PrismaClient()
  const hostess = await prisma.hostess.findUnique({
    where: { id: id },
  })
  return new Response(JSON.stringify(hostess), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

// API endpoint to update specific hostess by id
export async function PUT(req: Request) {
  const id = req.url.split("/")[6]
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
  const prisma = new PrismaClient()
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    age,
    education,
    hairColor,
    height,
    image,
  } = await req.json()
  const hostess = await prisma.hostess.update({
    where: { id: id },
    data: {
      firstName,
      lastName,
      email,
      phone,
      address,
      age: parseInt(age),
      education,
      hairColor,
      height: parseInt(height),
      image,
    },
  })
  return new Response(JSON.stringify(hostess), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

// API endpoint to delete specific hostess by id
export async function DELETE(req: Request) {
  const id = req.url.split("/")[6]
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
  const prisma = new PrismaClient()
  const hostess = await prisma.hostess.delete({
    where: { id: id },
  })
  return new Response(JSON.stringify(hostess), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
