import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 97vh;
  gap: 10px;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 300px;
  }
`

export const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  width: 100%;
  max-width: 300px;
`

export const SubmitButton = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-family: var(--font-mono);

  &:hover {
    background-color: #0060df;
  }
`
