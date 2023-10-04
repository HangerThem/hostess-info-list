"use client"

import TuneIcon from "@/icons/tune"
import { SearchBar, SearchBarContainer, SearchAction } from "./searchStyles"

interface SearchProps {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  settingsAction: () => void
}

const Search = ({ searchTerm, setSearchTerm, settingsAction }: SearchProps) => {
  return (
    <SearchBarContainer>
      <SearchBar
        type="text"
        name="search"
        placeholder="Hledat"
        defaultValue={searchTerm}
        title="Hledat"
        onChange={(e: any) => setSearchTerm(e.target.value)}
      />
      <SearchAction onClick={settingsAction} title="Pokročilé vyhledávání">
        <TuneIcon />
      </SearchAction>
    </SearchBarContainer>
  )
}

export default Search
