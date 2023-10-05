"use client"

import { ISearchTerms } from "@/interface/ISearchTerms"
import { useState } from "react"
import { Regions, HairColor } from "@/lib/enums"
import {
  RangeContainer,
  RangeProgress,
  RangeSliderContainer,
} from "./advancedSearchStyles"
import { SearchBar, SearchBarContainer } from "./searchStyles"
import Select from "react-select"

interface AdvancedSearchProps {
  advancedSearch: boolean
  searchTerms: ISearchTerms
  setSearchTerms: (e: any) => void
}

const AGE_RANGE = [18, 100]
const HEIGHT_RANGE = [130, 200]

const AdvancedSearch = ({
  advancedSearch,
  searchTerms,
  setSearchTerms,
}: AdvancedSearchProps) => {
  const hairColorOptions: SelectOption[] = Object.values(HairColor).map(
    (color) => {
      return {
        value: color,
        label: color,
      }
    }
  )
  const regionOptions: SelectOption[] = Object.values(Regions).map((region) => {
    return {
      value: region,
      label: region,
    }
  })

  const [minAge, setMinAge] = useState<number>(searchTerms.ageRange[0])
  const [maxAge, setMaxAge] = useState<number>(searchTerms.ageRange[1])
  const [minHeight, setMinHeight] = useState<number>(searchTerms.heightRange[0])
  const [maxHeight, setMaxHeight] = useState<number>(searchTerms.heightRange[1])

  const handleMinAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    setMinAge(value)
    if (value > maxAge) {
      setMaxAge(value)
      setSearchTerms({
        ageRange: [minAge, value],
      })
    } else {
      setSearchTerms({
        ageRange: [value, maxAge],
      })
    }
  }

  const handleMaxAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (value < AGE_RANGE[0]) return
    setMaxAge(value)
    if (value < minAge) {
      setMinAge(value)
      setSearchTerms({
        ageRange: [value, maxAge],
      })
    } else {
      setSearchTerms({
        ageRange: [minAge, value],
      })
    }
  }

  const handleMinHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value)
    setMinHeight(value)
    if (value > maxHeight) {
      setMaxHeight(value)
      setSearchTerms({
        ...searchTerms,
        heightRange: [minHeight, value],
      })
    } else {
      setSearchTerms({
        ...searchTerms,
        heightRange: [value, maxHeight],
      })
    }
  }

  const handleMaxHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value)
    if (value < HEIGHT_RANGE[0]) return
    setMaxHeight(value)
    if (value < minHeight) {
      setMinHeight(value)
      setSearchTerms({
        ...searchTerms,
        heightRange: [value, maxHeight],
      })
    } else {
      setSearchTerms({
        ...searchTerms,
        heightRange: [minHeight, value],
      })
    }
  }

  const handleHairColorChange = (event: any) => {
    setSearchTerms({
      ...searchTerms,
      hairColor: event.map((option: SelectOption) => option.value),
    })
  }

  const handleRegionChange = (event: any) => {
    setSearchTerms({
      ...searchTerms,
      region: event.map((option: SelectOption) => option.value),
    })
  }

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value
    setSearchTerms({
      ...searchTerms,
      city,
    })
  }

  return (
    <div style={{ display: advancedSearch ? "block" : "none" }}>
      <h1>Advanced Search</h1>
      <RangeContainer>
        <h2>Věk</h2>
        <p>
          {searchTerms.ageRange[0]} - {searchTerms.ageRange[1]}
        </p>
        <RangeSliderContainer>
          <RangeProgress
            min={searchTerms.ageRange[0]}
            max={searchTerms.ageRange[1]}
            limits={[AGE_RANGE[0], AGE_RANGE[1]]}
          />
          <input
            type="range"
            name="minAge"
            min={AGE_RANGE[0]}
            max={AGE_RANGE[1]}
            step="1"
            value={searchTerms.ageRange[0]}
            onChange={handleMinAgeChange}
          />
          <input
            type="range"
            name="maxAge"
            min={AGE_RANGE[0]}
            max={AGE_RANGE[1]}
            step="1"
            value={searchTerms.ageRange[1]}
            onChange={handleMaxAgeChange}
          />
        </RangeSliderContainer>
      </RangeContainer>
      <RangeContainer>
        <h2>Výška</h2>
        <p>
          {searchTerms.heightRange[0]} - {searchTerms.heightRange[1]}
        </p>
        <RangeSliderContainer>
          <RangeProgress
            min={searchTerms.heightRange[0]}
            max={searchTerms.heightRange[1]}
            limits={[HEIGHT_RANGE[0], HEIGHT_RANGE[1]]}
          />
          <input
            type="range"
            name="minHeight"
            min={HEIGHT_RANGE[0]}
            max={HEIGHT_RANGE[1]}
            step="1"
            value={searchTerms.heightRange[0]}
            onChange={handleMinHeightChange}
          />
          <input
            type="range"
            name="maxHeight"
            min={HEIGHT_RANGE[0]}
            max={HEIGHT_RANGE[1]}
            step="1"
            value={searchTerms.heightRange[1]}
            onChange={handleMaxHeightChange}
          />
        </RangeSliderContainer>
      </RangeContainer>
      <div>
        <h2>Barva vlasů</h2>
        <Select
          options={hairColorOptions}
          name="hairColor"
          isMulti={true}
          onChange={(e: any) => {
            handleHairColorChange(e)
          }}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              width: "300px",
              height: "40px",
              fontFamily: "var(--font-mono)",
              backgroundColor: "#3e3e3e",
              color: "#fff",
            }),
            option: (provided, state) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              color: "#fff",
              backgroundColor:
                state.isSelected || state.isFocused ? "#2d2d2d" : "#3e3e3e",
              cursor: state.isSelected ? "default" : "pointer",
            }),
            menu: (provided) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              backgroundColor: "#3e3e3e",
              color: "#fff",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              color: "#fff",
            }),
            placeholder: (provided) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              color: "#a0a0a0",
            }),
          }}
          isSearchable={false}
          isClearable={true}
          placeholder="Barva vlasů"
        />
      </div>
      <div>
        <h2>Kraj</h2>
        <Select
          options={regionOptions}
          name="region"
          isMulti={true}
          onChange={(e: any) => {
            handleRegionChange(e)
          }}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              width: "300px",
              height: "40px",
              fontFamily: "var(--font-mono)",
              backgroundColor: "#3e3e3e",
              color: "#fff",
            }),
            option: (provided, state) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              color: "#fff",
              backgroundColor:
                state.isSelected || state.isFocused ? "#2d2d2d" : "#3e3e3e",
              cursor: state.isSelected ? "default" : "pointer",
            }),
            menu: (provided) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              backgroundColor: "#3e3e3e",
              color: "#fff",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              color: "#fff",
            }),
            placeholder: (provided) => ({
              ...provided,
              fontFamily: "var(--font-mono)",
              color: "#989898",
            }),
            input: (provided) => ({
              ...provided,
              color: "#fff",
            }),
          }}
          isSearchable={true}
          isClearable={true}
          placeholder="Kraj"
        />
      </div>
      <div>
        <SearchBarContainer>
          <SearchBar placeholder="Město" onChange={handleCityChange} />
        </SearchBarContainer>
      </div>
    </div>
  )
}

export default AdvancedSearch
