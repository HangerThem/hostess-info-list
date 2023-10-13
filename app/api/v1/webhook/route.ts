import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const formData = await req.formData()

  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const address = formData.get("address")
  const region = formData.get("region")
  const age = formData.get("age")
  const education = formData.get("education")
  const hairColor = formData.get("hairColor")
  const height = formData.get("height")
  const gender = formData.get("gender")

  const hostess = await prisma.hostess.create({
    data: {
      firstName: firstName as string,
      lastName: lastName as string,
      email: email as string,
      phone: phone as string,
      address: address as string,
      region: region as string,
      age: Number(age),
      education: education as string,
      hairColor: hairColor as string,
      height: Number(height),
      gender: gender as string,
      image: "https://via.placeholder.com/200",
    },
  })
  return new Response(JSON.stringify(hostess), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
