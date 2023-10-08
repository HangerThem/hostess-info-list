import { Region } from "@/lib/enums"

export interface ISearchTerms {
  ageRange: [number, number]
  heightRange: [number, number]
  hairColor: string[]
  region: string[]
  city: string
}
