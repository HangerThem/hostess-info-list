"use client"

import { FormEvent, useState } from "react"
import {
  FormContainer,
  Form,
  Input,
  FormButton,
  FormButtons,
  FormColumns,
  FormColumn,
  FileInputContainer,
  FileInput,
  FileInputLabel,
} from "@/styles/formStyles"
import { selectStyles } from "@/styles/selectStyles"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Select from "react-select"
import UploadIcon from "@/icons/upload"
import { Region, HairColor, Gender } from "@/lib/enums"
import CancelIcon from "@/icons/cancel"

export default function Page() {
  const router = useRouter()
  const [fileName, setFileName] = useState<string | undefined>(
    "Soubor nenahrán"
  )
  const [uploadCSV, setUploadCSV] = useState<boolean>(false)
  const [CSVName, setCSVName] = useState<string | undefined>("Soubor nenahrán")
  const [loading, setLoading] = useState<boolean>(false)

  const HairColorOptions: SelectOption[] = Object.values(HairColor).map(
    (color) => {
      return {
        value: color,
        label: color,
      }
    }
  )
  const RegionOptions: SelectOption[] = Object.values(Region).map((region) => {
    return {
      value: region,
      label: region,
    }
  })
  const GenderOptions: SelectOption[] = Object.values(Gender).map((gender) => {
    return {
      value: gender,
      label: gender,
    }
  })

  const handleIsUploadCSV = () => {
    setUploadCSV(!uploadCSV)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    if (uploadCSV) {
      const csvFile = (
        e.currentTarget.elements.namedItem("csv") as HTMLInputElement
      ).files?.[0]
      if (csvFile) {
        formData.set("csv", csvFile)
      }
      try {
        const csvResponse = await fetch("/api/v1/upload/csv", {
          method: "POST",
          body: formData,
        })
        if (csvResponse.ok) {
          console.log("CSV uploaded successfully")
        } else {
          console.error("CSV upload failed")
          setLoading(false)
          return
        }
      } catch (error) {
        console.error("Error:", error)
        setLoading(false)
        return
      }
      router.push("/dashboard")
    }
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
        setLoading(false)
        return
      }
    } catch (error) {
      console.error("Error:", error)
      setLoading(false)
      return
    }
    router.push(`/dashboard/hostess/${id}`)
  }

  const handleRemoveFile = () => {
    const fileInput = document.getElementById("image") as HTMLInputElement
    fileInput.value = ""
    setFileName("Soubor nenahrán")
  }

  const handleRemoveCSV = () => {
    const fileInput = document.getElementById("csv") as HTMLInputElement
    fileInput.value = ""
    setCSVName("Soubor nenahrán")
  }

  if (uploadCSV) {
    return (
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <h1>Nahrát CSV</h1>
          <FormButton type="button" onClick={() => handleIsUploadCSV()}>
            Zpět
          </FormButton>
          <FormColumns>
            <FormColumn>
              <FileInputContainer>
                <FileInput
                  type="file"
                  name="csv"
                  id="csv"
                  placeholder="CSV"
                  onChange={(e) => setCSVName(e.currentTarget.files?.[0].name)}
                  accept=".csv"
                />
                <FileInputLabel htmlFor="csv">
                  Vybrat
                  <UploadIcon />
                </FileInputLabel>
                <span>{CSVName}</span>
                <div onClick={() => handleRemoveCSV()}>
                  <CancelIcon />
                </div>
              </FileInputContainer>
            </FormColumn>
          </FormColumns>
          <FormButtons>
            <FormButton type="submit" disabled={loading}>
              Nahrát
            </FormButton>
            <FormButton type="button" value="Zpět">
              <Link href="/dashboard">Zpět</Link>
            </FormButton>
          </FormButtons>
        </Form>
      </FormContainer>
    )
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Přidat záznam</h1>
        <FormButton type="button" onClick={() => handleIsUploadCSV()}>
          Nahrát CSV
        </FormButton>
        <FormColumns>
          <FormColumn>
            <Input type="text" name="firstName" required placeholder="Jméno" />
            <Input type="text" name="email" placeholder="Email" />
            <Input type="text" name="address" placeholder="Adresa" />
            <Input type="number" name="height" placeholder="Výška" />
            <Input type="text" name="education" placeholder="Vzdělání" />
            <Select
              options={GenderOptions}
              name="gender"
              styles={selectStyles}
              isSearchable={false}
              isClearable={true}
              placeholder="Pohlaví"
            />
          </FormColumn>
          <FormColumn>
            <Input type="text" name="lastName" placeholder="Příjmení" />
            <Input type="text" name="phone" placeholder="Telefon" />
            <Select
              options={RegionOptions}
              name="region"
              styles={selectStyles}
              isSearchable={true}
              isClearable={true}
              placeholder="Kraj"
            />
            <Input
              type="number"
              name="age"
              placeholder="Věk"
              max="100"
              min="18"
            />
            <Select
              options={HairColorOptions}
              name="hairColor"
              styles={selectStyles}
              isSearchable={false}
              isClearable={true}
              placeholder="Barva vlasů"
            />
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
              <div onClick={() => handleRemoveFile()}>
                <CancelIcon />
              </div>
            </FileInputContainer>
          </FormColumn>
        </FormColumns>
        <FormButtons>
          <FormButton type="submit" disabled={loading}>
            Vytvořit
          </FormButton>
          <FormButton type="button" value="Zpět">
            <Link href="/dashboard">Zpět</Link>
          </FormButton>
        </FormButtons>
      </Form>
    </FormContainer>
  )
}
