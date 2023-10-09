import styled from "styled-components"
import Image from "next/image"

export const HostessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`

export const HostessImage = styled(Image)`
  object-fit: cover;
  background-color: white;
  width: 100%;
  height: 100%;
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
  display: grid;
  gap: 20px;
  list-style: none;
  padding: 20px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
