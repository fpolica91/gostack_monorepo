import styled from 'styled-components'
import { darken } from 'polished'
export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 4px;
  img {
    margin: 20px 0;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      border: 0;
      border-radius: 4px;
      background: #7152c1;
      font-size: 16px;
      color: #fff;
      &: hover {
        background: ${darken(0.03, '#7152c1')};
      }
    }
  }
`
