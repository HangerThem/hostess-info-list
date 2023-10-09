"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/auth"
import { FormContainer, Form, Input, FormButton } from "@/styles/formStyles"

export default function Home() {
  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    fetch("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push("/dashboard")
          setToken(res.token)
        }
      })
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Přihlášení</h1>
        <Input type="text" name="username" placeholder="Uživatelské jméno" />
        <Input type="password" name="password" placeholder="Heslo" />
        <FormButton type="submit">Přihlásit se</FormButton>
      </Form>
    </FormContainer>
  )
}
