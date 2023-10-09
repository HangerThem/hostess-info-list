"use client"

import { ISearchTerms } from "@/interface/ISearchTerms"
import { useState } from "react"
import { Region, HairColor, Gender } from "@/lib/enums"
import {
  AdvancedSearchContainer,
  AdvancedSearchColumn,
  RangeContainer,
  AdvancedSearchRow,
  RangeProgress,
  RangeSliderContainer,
  SelectContainer,
} from "./advancedSearchStyles"
import { Input } from "@/styles/formStyles"
import Select from "react-select"
import { selectStyles } from "@/styles/selectStyles"

interface AdvancedSearchProps {
  advancedSearch: boolean
  searchTerms: ISearchTerms
  setSearchTerms: (e: any) => void
}

const AGE_RANGE = [15, 100]
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
  const regionOptions: SelectOption[] = Object.values(Region).map((region) => {
    return {
      value: region,
      label: region,
    }
  })
  const genderOptions: SelectOption[] = Object.values(Gender).map((gender) => {
    return {
      value: gender,
      label: gender,
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

  const handleGenderChange = (event: any) => {
    setSearchTerms({
      ...searchTerms,
      gender: event.map((option: SelectOption) => option.value),
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
    <AdvancedSearchContainer show={advancedSearch}>
      <AdvancedSearchRow>
        <div>
          <h2>Město:</h2>
          <Input placeholder="Město" onChange={handleCityChange} />
        </div>
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
      </AdvancedSearchRow>
      <AdvancedSearchColumn>
        <SelectContainer>
          <h2>Barva vlasů</h2>
          <Select
            options={hairColorOptions}
            name="hairColor"
            isMulti={true}
            onChange={(e: any) => {
              handleHairColorChange(e)
            }}
            styles={selectStyles}
            isSearchable={true}
            isClearable={true}
            placeholder="Barva vlasů"
            menuPosition="fixed"
            menuPlacement="auto"
            closeMenuOnSelect={false}
          />
        </SelectContainer>
        <SelectContainer>
          <h2>Kraj</h2>
          <Select
            options={regionOptions}
            name="region"
            isMulti={true}
            onChange={(e: any) => {
              handleRegionChange(e)
            }}
            styles={selectStyles}
            isSearchable={true}
            isClearable={true}
            placeholder="Kraj"
            menuPosition="fixed"
            menuPlacement="auto"
            closeMenuOnSelect={false}
          />
        </SelectContainer>
        <SelectContainer>
          <h2>Pohlaví:</h2>
          <Select
            options={genderOptions}
            name="gender"
            isMulti={true}
            onChange={(e: any) => {
              handleGenderChange(e)
            }}
            styles={selectStyles}
            isClearable={true}
            placeholder="Pohlaví"
            menuPosition="fixed"
            menuPlacement="auto"
            closeMenuOnSelect={false}
          />
        </SelectContainer>
      </AdvancedSearchColumn>
    </AdvancedSearchContainer>
  )
}

export default AdvancedSearch
