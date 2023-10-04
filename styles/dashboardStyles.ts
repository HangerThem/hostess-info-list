import styled from "styled-components"
import Image from "next/image"

export const HostessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 200px;
`

export const HostessImage = styled(Image)`
  object-fit: cover;
  background-color: white;
`

export const HostessName = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
`

export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #222;

  h1 {
    font-size: 50px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

export const HostessesContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  margin-top: 20px;
`

export const DashboardButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #0060df;
  }
`
