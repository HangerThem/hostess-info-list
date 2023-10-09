import { PrismaClient } from "@prisma/client"
import { getTokenFromServer } from "@/lib/serverAuth"
import { verifyToken } from "@/lib/token"
import Papa from "papaparse"

const prisma = new PrismaClient()

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

  const formData = await req.formData()
  const CSVFile = formData.get("csv")
  if (CSVFile) {
    try {
      const text = await (CSVFile as Blob).text()

      const lines = text.split("\n").slice(1)

      for (const line of lines) {
        const cleanData: any = Papa.parse(line).data[0]
        cleanData.forEach((item: string, index: number) => {
          if (item.includes("\\/")) {
            cleanData[index] = item.replace("\\/", " ")
          }
        })
        cleanData[2] =
          cleanData[2] !== "not_selected"
            ? cleanData[2].charAt(0).toUpperCase() + cleanData[2].slice(1)
            : ""
        cleanData[6] =
          cleanData[6].length > 9 ? cleanData[6].slice(-9) : cleanData[6]

        const existingHostess = await prisma.hostess.findUnique({
          where: { email: cleanData[5] },
        })

        if (existingHostess) {
          const updateData: Partial<Hostess> = {}
          if (!existingHostess.address) updateData.address = cleanData[4]
          if (!existingHostess.age) updateData.age = Number(cleanData[3])
          if (!existingHostess.education) updateData.education = cleanData[8]
          if (!existingHostess.gender) updateData.gender = cleanData[2]
          if (!existingHostess.hairColor) updateData.hairColor = ""

          await prisma.hostess.update({
            where: { id: existingHostess.id },
            data: updateData,
          })
        } else {
          const hostessData: Hostess = {
            firstName: cleanData[0],
            lastName: cleanData[1],
            email: cleanData[5],
            phone: cleanData[6],
            address: cleanData[4],
            region: "",
            age: Number(cleanData[3]),
            education: cleanData[8] || "",
            hairColor: "",
            height: Number(),
            gender: cleanData[2],
            image: "https://via.placeholder.com/200",
          }
          try {
            await prisma.hostess.create({
              data: hostessData,
            })
          } catch (error) {
            console.error("Error creating hostess:", error)
          }
        }
      }

      console.log("CSV uploaded and data processed successfully")
    } catch (error) {
      console.error("Error parsing CSV:", error)
      return new Response(JSON.stringify({ message: "Error parsing CSV" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      })
    }
  } else {
    console.error("No CSV file uploaded")
    return new Response(JSON.stringify({ message: "No CSV file uploaded" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  return new Response(JSON.stringify({ message: "CSV upload complete" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
