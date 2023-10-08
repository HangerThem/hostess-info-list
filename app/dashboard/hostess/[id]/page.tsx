"use client"

import { FormEvent } from "react"
import { useEffect, useState } from "react"
import {
  HostessDetailLabel,
  HostessDetailRow,
  HostessDetailValue,
  HostessDetailsTable,
  HostessInfoContainer,
  HostessDetails,
  HostessName,
  EditButton,
  DeleteButton,
  SaveButton,
  CancelButton,
} from "@/styles/hostessStyles"
import { selectStyles } from "@/styles/selectStyles"
import { useRouter } from "next/navigation"
import { HostessImage } from "@/styles/hostessStyles"
import CancelIcon from "@/icons/cancel"
import EditIcon from "@/icons/edit"
import SaveIcon from "@/icons/save"
import DeleteIcon from "@/icons/delete"
import Link from "next/link"
import Select from "react-select"
import { HairColor, Region, Gender } from "@/lib/enums"

export default function Page({ params }: any) {
  const [hostess, setHostess] = useState<Hostess>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [image, setImage] = useState<File>()
  const router = useRouter()

  const fetchHostesses = async () => {
    const res = await fetch(`/api/v1/hostess/${params.id}`)
    const data = await res.json()
    setHostess(data)
    setLoading(false)
  }

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

  useEffect(() => {
    fetchHostesses()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: any = {}
    formData.forEach((value: FormDataEntryValue, key: string) => {
      if (key === "image") {
        const file = value as File
        data[key] = file
      } else {
        data[key] = value
      }
    })
    if (
      image !== undefined &&
      image?.name.replace(/[^a-zA-Z0-9]/g, "") !==
        hostess?.image.split("/")[4].replace(/[^a-zA-Z0-9]/g, "")
    ) {
      const formDataImage = new FormData()
      formDataImage.set("image", image)
      await fetch("/api/v1/upload", {
        method: "POST",
        body: formDataImage,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            data.image = res.data.url
          }
        })
    } else {
      data.image = hostess?.image
    }
    await fetch(`/api/v1/hostess/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })

    fetchHostesses()
    setIsEditing(false)
  }

  const handleDelete = async () => {
    await fetch(`/api/v1/hostess/${params.id}`, {
      method: "DELETE",
    })
    router.push("/dashboard")
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!hostess) {
    return <p>Hosteska nenalezena</p>
  }

  return (
    <HostessInfoContainer>
      <Link href="/dashboard" style={{ color: "#000" }}>
        Zpět
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <HostessName>
          {!isEditing ? (
            hostess.firstName + " " + hostess.lastName
          ) : (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="Jméno"
                defaultValue={hostess.firstName}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Příjmení"
                defaultValue={hostess.lastName}
              />
            </>
          )}
        </HostessName>
        <HostessDetails>
          {!isEditing ? (
            <HostessImage
              src={hostess.image}
              width={200}
              height={200}
              alt={hostess.firstName + " " + hostess.lastName}
            />
          ) : (
            <input
              type="file"
              name="image"
              placeholder="Fotka"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0]
                if (file) {
                  setImage(file)
                }
              }}
            />
          )}
          <HostessDetailsTable>
            <HostessDetailRow>
              <HostessDetailLabel>Email:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.email
                ) : (
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    defaultValue={hostess.email}
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Telefon:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.phone
                ) : (
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefon"
                    defaultValue={hostess.phone}
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Vzdělání:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.education
                ) : (
                  <input
                    type="text"
                    name="education"
                    placeholder="Vzdělání"
                    defaultValue={hostess.education}
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Věk:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.age
                ) : (
                  <input
                    type="number"
                    name="age"
                    placeholder="Věk"
                    defaultValue={hostess.age}
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Adresa:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.address
                ) : (
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresa"
                    defaultValue={hostess.address}
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Kraj:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.region
                ) : (
                  <Select
                    options={RegionOptions}
                    name="region"
                    styles={selectStyles}
                    isSearchable={true}
                    isClearable={true}
                    placeholder="Kraj"
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Barva vlasů:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.hairColor
                ) : (
                  <Select
                    options={HairColorOptions}
                    name="hairColor"
                    styles={selectStyles}
                    isSearchable={false}
                    isClearable={true}
                    placeholder="Barva vlasů"
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Výška:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.height + "cm"
                ) : (
                  <input
                    type="number"
                    name="height"
                    placeholder="Výška"
                    defaultValue={hostess.height}
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
            <HostessDetailRow>
              <HostessDetailLabel>Pohlaví:</HostessDetailLabel>
              <HostessDetailValue>
                {!isEditing ? (
                  hostess.gender
                ) : (
                  <Select
                    options={GenderOptions}
                    name="gender"
                    styles={selectStyles}
                    isSearchable={false}
                    isClearable={true}
                    placeholder="Pohlaví"
                  />
                )}
              </HostessDetailValue>
            </HostessDetailRow>
          </HostessDetailsTable>
        </HostessDetails>

        {!isEditing ? (
          <EditButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </EditButton>
        ) : (
          <>
            <SaveButton type="submit">
              <SaveIcon />
            </SaveButton>
            <CancelButton onClick={() => setIsEditing(false)}>
              <CancelIcon />
            </CancelButton>
          </>
        )}
        {!isEditing ? (
          <DeleteButton onClick={() => handleDelete()}>
            <DeleteIcon />
          </DeleteButton>
        ) : null}
      </form>
    </HostessInfoContainer>
  )
}
