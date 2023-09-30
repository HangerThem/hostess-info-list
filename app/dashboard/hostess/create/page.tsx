"use client"

import { FormEvent } from "react"
import { Form, Input, SubmitButton } from "@/styles/loginStyles"
import AddIcon from "@/icons/add"

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
    <Form onSubmit={handleSubmit}>
      <h1>Vytvořit hostesku</h1>
      <Input type="text" name="firstName" required placeholder="Jméno" />
      <Input type="text" name="lastName" required placeholder="Příjmení" />
      <Input type="text" name="email" placeholder="Email" />
      <Input type="text" name="phone" placeholder="Telefon" />
      <Input type="text" name="address" placeholder="Adresa" />
      <Input type="text" name="education" placeholder="Vzdělání" />
      <Input type="number" name="age" placeholder="Věk" />
      <Input type="text" name="hairColor" placeholder="Barva vlasů" />
      <Input type="number" name="height" placeholder="Výška" />
      <Input type="file" name="image" placeholder="Fotka" accept="image/*" />
      <SubmitButton type="submit" value="Vytvořit" />
    </Form>
  )
}
