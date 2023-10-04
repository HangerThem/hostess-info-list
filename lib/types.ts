interface ISearchTerms {
  ageRange: [number, number]
  heightRange: [number, number]
  hairColor: string
  region: Regions
}

interface Hostess {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  age: number
  education: string
  hairColor: string
  height: number
  image: string
}

interface HairColorOption {
  label: string
  value: string
}
