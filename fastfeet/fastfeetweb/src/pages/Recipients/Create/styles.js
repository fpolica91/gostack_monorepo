import styled from 'styled-components'

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  background: #fff;
  border-radius: 4px;
  padding: 5px;

  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    div {
      display: flex;
      justify-content: space-around;
    }

    input {
      width: 100%;
      background: #fff;
      border: solid 1px #d2d2d2;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #999999;
      margin: 0 0 10px;
      &::placeholder: {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
`

export const Controls = styled.div`
  max-width: 600px;
  margin: 50px auto;
  div {
    display: flex;
    justify-content: space-between;
    h2 {
      color: #444444;
    }
  }
`

export const SaveButton = styled.button`
  background: #7d40e7;
  padding: 5px;
  width: 80px;
  color: #fff;
  border-radius: 4px;
  margin-right: 10px;
`
export const ReturnButton = styled.button`
  background: #cccccc;
  color: #fff;
  padding: 5px;
  width: 80px;
`
