"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/auth"
import { Form, Input, SubmitButton } from "@/styles/loginStyles"

export default function Home() {
  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    fetch("/api/v1/auth/login", {
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
    <Form onSubmit={handleSubmit}>
      <h1>Přihlášení</h1>
      <Input type="text" name="username" placeholder="Uživatelské jméno" />
      <Input type="password" name="password" placeholder="Heslo" />
      <SubmitButton type="submit" value="Přihlásit se" />
    </Form>
  )
}
