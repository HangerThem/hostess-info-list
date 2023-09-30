import { getTokenFromServer } from "@/lib/serverAuth"
import { verifyToken } from "@/lib/token"

// API endpoint to upload an image
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
  const imageFile = formData.get("image")

  const imgBBSettings = {
    method: "POST",
    body: formData,
  }

  const imgBBResponse = await fetch(
    "https://api.imgbb.com/1/upload?key=" + process.env.IMGBB_API_KEY,
    imgBBSettings
  )
    .then((res) => res.json())
    .then((json) => {
      return json
    })

  return new Response(JSON.stringify(imgBBResponse), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
