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
import { ISearchTerms } from "@/interface/ISearchTerms"
import Image from "next/image"

export default function Page() {
  const [hostesses, setHostesses] = useState<Hostess[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false)
  const [searchTerms, setSearchTerms] = useState<ISearchTerms>({
    ageRange: [15, 100],
    heightRange: [130, 200],
    hairColor: [],
    region: [],
    city: "",
    gender: "",
  })
  const router = useRouter()

  const fetchHostesses = async () => {
    const res = await fetch("/api/v1/hostess")
    const data = await res.json()
    data.sort((a: Hostess, b: Hostess) => {
      const nameA = a.firstName.toUpperCase()
      const nameB = b.firstName.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      return 0
    })
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

  const handleAdvancedSearchToggle = () => {
    setAdvancedSearch(!advancedSearch)
  }

  const handleSearchTermsChange = (e: any) => {
    setSearchTerms({ ...searchTerms, ...e })
  }

  return (
    <div>
      <DashboardHeader>
        <Image
          src="/logo.png"
          alt="logo"
          width="200"
          height="50"
          style={{ width: "auto" }}
        />
        <div>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            settingsAction={handleAdvancedSearchToggle}
          />
          <DashboardButton onClick={() => logout()} title="Odhlásit se">
            <LogoutIcon />
          </DashboardButton>
          <Link href="/dashboard/hostess/create">
            <DashboardButton title="Přidat hostesku">
              <AddIcon />
            </DashboardButton>
          </Link>
        </div>
      </DashboardHeader>
      <AdvancedSearch
        advancedSearch={advancedSearch}
        searchTerms={searchTerms}
        setSearchTerms={handleSearchTermsChange}
      />

      <HostessesContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {!advancedSearch &&
              hostesses.map((hostess) =>
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
            {advancedSearch &&
              hostesses.map((hostess) => {
                const age = hostess.age
                const height = hostess.height
                const hairColor = hostess.hairColor
                const address = hostess.address
                const region = hostess.region
                const gender = hostess.gender
                const isAgeInRange =
                  age >= searchTerms.ageRange[0] &&
                  age <= searchTerms.ageRange[1]
                const isHeightInRange =
                  (height >= searchTerms.heightRange[0] &&
                    height <= searchTerms.heightRange[1]) ||
                  // Temporary fix for hostesses without height from import of CSV
                  height === 0
                const isHairColorCorrect =
                  (searchTerms.hairColor.length
                    ? searchTerms.hairColor.includes(hairColor)
                    : // Temporary fix for hostesses without hairColor from import of CSV
                      true) || hairColor === ""
                const isAdressCorrect = searchTerms.city
                  ? address.toLowerCase().includes(searchTerms.city)
                  : true
                const isRegionCorrect =
                  (searchTerms.region.length
                    ? searchTerms.region.includes(region)
                    : // Temporary fix for hostesses without region from import of CSV
                      true) || region === ""
                const isGenderCorrect = searchTerms.gender.length
                  ? searchTerms.gender.includes(gender)
                  : true
                return isGenderCorrect &&
                  isAdressCorrect &&
                  isAgeInRange &&
                  isRegionCorrect &&
                  isHairColorCorrect &&
                  isHeightInRange ? (
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
              })}
          </>
        )}
      </HostessesContainer>
    </div>
  )
}
