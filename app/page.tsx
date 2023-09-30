"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/auth"

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" name="username" placeholder="Uživatelské jméno" />
      <input type="password" name="password" placeholder="Heslo" />
      <input type="submit" value="Přihlásit se" />
    </form>
  )
}
