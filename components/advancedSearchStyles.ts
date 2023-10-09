import { styled } from "styled-components"

interface IAgeRangeProps {
  min: number
  max: number
  limits: [number, number]
}

interface IAdvancedSearchProps {
  show: boolean
}

export const AdvancedSearchContainer = styled.div<IAdvancedSearchProps>`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #222;
  width: 100%;
`

export const AdvancedSearchColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const AdvancedSearchRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div {
    flex: 1;
  }

  input {
    width: 100%;
  }
`

export const SelectContainer = styled.div`
  width: 100%;
`

export const RangeContainer = styled.div`
  p {
    margin: 0;
    text-align: center;
  }
`

export const RangeSliderContainer = styled.div`
  position: relative;
  height: 25px;

  input[type="range"] {
    position: absolute;
    width: 100%;
    height: 5px;
    background: none;
    pointer-events: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::-webkit-slider-thumb {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: none;
      background: #0070f3;
      pointer-events: auto;
      -webkit-appearance: none;

      &:hover {
        cursor: pointer;
      }

      &:active {
        cursor: grabbing;
        background-color: #0060df;
      }
    }

    &::-moz-range-thumb {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: none;
      background: #0070f3;
      pointer-events: auto;
      -webkit-appearance: none;
      appearance: none;

      &:hover {
        cursor: pointer;
      }

      &:active {
        cursor: grabbing;
        background-color: #0060df;
      }
    }
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 5px;
    background: #eaeaea;
    border-radius: 5px;
    top: 0;
    left: 0;
  }
`

export const RangeProgress = styled.div<IAgeRangeProps>`
  position: absolute;
  border-radius: 5px;
  background: #0070f3;
  height: 5px;
  top: 0;
  width: ${(props) =>
    ((props.max - props.min) / (props.limits[1] - props.limits[0])) * 100 +
    "%"};
  left: ${(props) =>
    ((props.min - props.limits[0]) / (props.limits[1] - props.limits[0])) *
      100 +
    "%"};
`
