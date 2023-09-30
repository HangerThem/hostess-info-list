"use client"

import { FormEvent } from "react"

export default function Page() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataImage = new FormData()
    const imageFile = (
      e.currentTarget.elements.namedItem("image") as HTMLInputElement
    ).files?.[0]
    if (!imageFile) return
    formDataImage.set("image", imageFile)

    try {
      const imageResponse = await fetch("/api/v1/upload", {
        method: "POST",
        body: formDataImage,
      })

      if (imageResponse.ok) {
        const imageResult = await imageResponse.json()
        formData.set("image", imageResult.data.url)
        const hostessData: Hostess = Object.fromEntries(
          formData
        ) as unknown as Hostess

        const hostessResponse = await fetch("/api/v1/hostess", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hostessData),
        })

        if (hostessResponse.ok) {
          console.log("Hostess created successfully")
        } else {
          console.error("Failed to create hostess")
        }
      } else {
        console.error("Image upload failed")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div>
      <h1>Vytvořit hostesku</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="firstName" required placeholder="Jméno" />
        <input type="text" name="lastName" required placeholder="Příjmení" />
        <input type="text" name="email" placeholder="Email" />
        <input type="text" name="phone" placeholder="Telefon" />
        <input type="text" name="address" placeholder="Adresa" />
        <input type="text" name="education" placeholder="Vzdělání" />
        <input type="number" name="age" placeholder="Věk" />
        <input type="text" name="hairColor" placeholder="Barva vlasů" />
        <input type="number" name="height" placeholder="Výška" />
        <input type="file" name="image" placeholder="Fotka" accept="image/*" />
        <input type="submit" value="Vytvořit" />
      </form>
    </div>
  )
}
