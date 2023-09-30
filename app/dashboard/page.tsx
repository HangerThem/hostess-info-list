"use client"

import { useEffect, useState } from "react"
import { removeToken } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {
  HostessContainer,
  HostessImage,
  HostessName,
} from "@/styles/dashboardStyles"
import Link from "next/link"

export default function Page() {
  const [hostesses, setHostesses] = useState<Hostess[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const fetchHostesses = async () => {
    const res = await fetch("/api/v1/hostess")
    const data = await res.json()
    setHostesses(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchHostesses()
  }, [])

  const logout = async () => {
    removeToken()
    router.push("/")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => fetchHostesses()}>Obnovit</button>
      <button onClick={() => logout()}>Odhlásit</button>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <input
              type="text"
              name="search"
              placeholder="Hledat"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {hostesses.map((hostess) =>
              hostess.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              hostess.lastName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              (
                hostess.firstName.toLowerCase() +
                " " +
                hostess.lastName.toLowerCase()
              ).includes(searchTerm.toLowerCase()) ? (
                <li key={hostess.id}>
                  <Link href={`/dashboard/hostess/${hostess.id}`}>
                    <HostessContainer>
                      <HostessImage
                        src={hostess.image}
                        width={200}
                        height={200}
                        alt={hostess.firstName + " " + hostess.lastName}
                      />
                      <HostessName>
                        {hostess.firstName} {hostess.lastName}
                      </HostessName>
                    </HostessContainer>
                  </Link>
                </li>
              ) : null
            )}
          </>
        )}
      </ul>
    </div>
  )
}
