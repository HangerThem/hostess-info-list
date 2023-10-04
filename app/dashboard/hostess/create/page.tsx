"use client"

import { FormEvent, useState } from "react"
import {
  Form,
  Input,
  SubmitButton,
  FormButtons,
  FileInputContainer,
  FileInput,
  FileInputLabel,
} from "@/styles/formStyles"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardButton } from "@/styles/dashboardStyles"
import Select from "react-select"
import UploadIcon from "@/icons/upload"

export default function Page() {
  const router = useRouter()
  const [fileName, setFileName] = useState<string | undefined>(
    "Soubor nenahrán"
  )
  const HairColor: HairColorOption[] = [
    {
      value: "bruneta",
      label: "Bruneta",
    },
    {
      value: "blondýna",
      label: "Blondýna",
    },
    {
      value: "černovlasá",
      label: "Černovlasá",
    },
    {
      value: "zrzka",
      label: "Zrzka",
    },
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formDataImage = new FormData()
    let id: string
    let hostessData: Hostess
    const imageFile = (
      e.currentTarget.elements.namedItem("image") as HTMLInputElement
    ).files?.[0]
    if (imageFile) {
      formDataImage.set("image", imageFile)
    }

    try {
      if (imageFile) {
        const imageResponse = await fetch("/api/v1/upload", {
          method: "POST",
          body: formDataImage,
        })

        if (imageResponse.ok) {
          const imageResult = await imageResponse.json()
          formData.set("image", imageResult.data.url)
          hostessData = Object.fromEntries(formData) as unknown as Hostess
        } else {
          console.error("Image upload failed")
          return
        }
      } else {
        formData.set("image", "https://via.placeholder.com/200")
        hostessData = Object.fromEntries(formData) as unknown as Hostess
      }
      const hostessResponse = await fetch("/api/v1/hostess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hostessData),
      })

      if (hostessResponse.ok) {
        const responseData = await hostessResponse.json()
        id = responseData.id
        console.log("Hostess created successfully")
      } else {
        console.error("Failed to create hostess")
        return
      }
    } catch (error) {
      console.error("Error:", error)
      return
    }
    router.push(`/dashboard/hostess/${id}`)
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
      <Select
        options={HairColor}
        name="hairColor"
        styles={{
          control: (provided) => ({
            ...provided,
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            width: "300px",
            height: "40px",
            fontFamily: "var(--font-mono)",
            backgroundColor: "#3e3e3e",
          }),
          option: (provided, state) => ({
            ...provided,
            fontFamily: "var(--font-mono)",
            color: "#fff",
            backgroundColor:
              state.isSelected || state.isFocused ? "#2d2d2d" : "#3e3e3e",
            cursor: state.isSelected ? "default" : "pointer",
          }),
          menu: (provided) => ({
            ...provided,
            fontFamily: "var(--font-mono)",
            backgroundColor: "#3e3e3e",
          }),
          singleValue: (provided) => ({
            ...provided,
            fontFamily: "var(--font-mono)",
            color: "#fff",
          }),
        }}
        isSearchable={false}
        placeholder="Barva vlasů"
      />
      <Input type="number" name="height" placeholder="Výška" />
      <FileInputContainer>
        <FileInput
          type="file"
          name="image"
          id="image"
          placeholder="Fotka"
          onChange={(e) => setFileName(e.currentTarget.files?.[0].name)}
          accept="image/*"
        />
        <FileInputLabel htmlFor="image">
          Vybrat
          <UploadIcon />
        </FileInputLabel>
        <span>{fileName}</span>
      </FileInputContainer>
      <FormButtons>
        <SubmitButton type="submit" value="Vytvořit" />
        <SubmitButton type="reset" value="Resetovat" />
        <DashboardButton type="button" value="Zpět">
          <Link href="/dashboard">Zpět</Link>
        </DashboardButton>
      </FormButtons>
    </Form>
  )
}
