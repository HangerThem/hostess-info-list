import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 97vh;
  gap: 10px;
  margin-top: 20px;
`

export const FormButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 300px;
`

export const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #3e3e3e;
  font-family: var(--font-mono);

  &:focus {
    outline: 1px solid #0070f3;
  }
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

export const FileInputContainer = styled.div`
  border: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #3e3e3e;
  font-family: var(--font-mono);
  overflow: hidden;
  display: flex;
  align-items: center;

  span {
    padding: 10px;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const FileInput = styled.input`
  display: none;
`

export const FileInputLabel = styled.label`
  height: 40px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #5e5e5e;
  cursor: pointer;

  &:hover {
    background-color: #6e6e6e;
  }
`
