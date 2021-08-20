import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  width: 100%;
  border: 0;
  margin-top: 16px;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, '#FF9000')};
  }
`
