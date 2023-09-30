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
