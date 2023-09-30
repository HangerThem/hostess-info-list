"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { verifyToken } from "@/lib/token"
import { getToken } from "@/lib/auth"

export default function withAuth(Component: any) {
  return function Auth(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const router = useRouter()
    const checkTokenValidity = async (token: string | null) => {
      if (token) {
        try {
          verifyToken(token)
          setIsAuthenticated(true)
        } catch (error) {
          console.log(error)
          router.push("/")
        }
      } else {
        console.log("No token found")
        router.push("/")
      }
    }

    useEffect(() => {
      const token = getToken() || null
      checkTokenValidity(token)
    }, [])
    return isAuthenticated ? <Component {...props} /> : null
  }
}
