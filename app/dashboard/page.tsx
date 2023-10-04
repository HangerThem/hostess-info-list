"use client"

import { useEffect, useState } from "react"
import { removeToken } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {
  HostessContainer,
  HostessImage,
  HostessName,
  HostessesContainer,
  DashboardHeader,
  DashboardButton,
} from "@/styles/dashboardStyles"
import Link from "next/link"
import AddIcon from "@/icons/add"
import LogoutIcon from "@/icons/logout"
import Search from "@/components/search"
import AdvancedSearch from "@/components/advancedSearch"

export default function Page() {
  const [hostesses, setHostesses] = useState<Hostess[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false)
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

  const handleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch)
  }

  return (
    <div>
      <DashboardHeader>
        <h1>HIL - Dashboard</h1>
        <div>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            settingsAction={handleAdvancedSearch}
          />
          <DashboardButton onClick={() => logout()} title="Odhlásit se">
            <LogoutIcon />
          </DashboardButton>
          <DashboardButton title="Přidat hostesku">
            <Link href="/dashboard/hostess/create">
              <AddIcon />
            </Link>
          </DashboardButton>
        </div>
      </DashboardHeader>
      <AdvancedSearch
        advancedSearch={advancedSearch}
        searchTerms={{
          ageRange: [18, 30],
          heightRange: [160, 180],
          hairColor: "blonde",
          region: Regions.Prague,
        }}
      />

      <HostessesContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
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
      </HostessesContainer>
    </div>
  )
}
