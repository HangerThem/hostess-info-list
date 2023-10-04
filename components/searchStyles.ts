import { styled } from "styled-components"

export const SearchBarContainer = styled.div`
  padding: 10px;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  background-color: #3e3e3e;
  height: 47.2px;
`

export const SearchBar = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  outline: none;
  background-color: transparent;
  color: #eee;
  font-family: "Roboto", sans-serif;
`

export const SearchAction = styled.div`
  cursor: pointer;
`
