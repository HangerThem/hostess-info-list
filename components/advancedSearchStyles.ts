import { styled } from "styled-components"

interface IAgeRangeProps {
  min: number
  max: number
  limits: [number, number]
}

export const RangeContainer = styled.div`
  width: 200px;
`

export const RangeSliderContainer = styled.div`
  position: relative;
  width: 100%;

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
