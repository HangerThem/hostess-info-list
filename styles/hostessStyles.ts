import styled from "styled-components"
import Image from "next/image"

export const HostessInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: calc(50%);
  left: calc(50%);
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 20px;
  width: fit-content;

  form {
    width: fit-content;
  }

  input {
    width: 200px;
    background-color: transparent;
    border: none;
    outline: none;
    color: #000;
    font-size: 16px;
    font-family: var(--font-mono);

    &::placeholder {
      color: #999;
    }

    &[type="number"] {
      webkit-appearance: textfield;
      -moz-appearance: textfield;
      appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      &[type="number"] {
        -moz-appearance: number-input;
      }

      &[type="number"]::-webkit-inner-spin-button,
      &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`

export const HostessImage = styled(Image)`
  border-radius: 50%;
  margin-bottom: 20px;
`

export const HostessDetailsTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
`

export const HostessDetailRow = styled.tr`
  border-bottom: 1px solid #ddd;
  width: 100%;
`

export const HostessDetailLabel = styled.td`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  color: #666;
  width: 250px;
`

export const HostessDetailValue = styled.td`
  font-size: 16px;
  padding: 10px;
  color: #444;
`

export const EditButton = styled.button`
  font-size: 16px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 150px;
  margin-right: 25px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #555;
  }
`

export const DeleteButton = styled(EditButton)`
  background-color: #f00;

  &:hover {
    background-color: #f55;
  }
`

export const SaveButton = styled(EditButton)`
  background-color: #070;

  &:hover {
    background-color: #0a0;
  }
`

export const CancelButton = styled(EditButton)`
  background-color: #f00;

  &:hover {
    background-color: #f55;
  }
`

export const HostessName = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;

  input {
    font-size: 24px;
    font-weight: bold;
    max-width: 150px;
  }
`

export const HostessDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`
