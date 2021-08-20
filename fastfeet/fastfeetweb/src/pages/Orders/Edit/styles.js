import styled from 'styled-components'

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  background: #fff;
  border-radius: 4px;

  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    .css-yk16xz-control {
      margin-top: 20px;
      color: #444444;
    }

    > input {
      margin-top: 20px !important;
      border: solid 1px #d2d2d2;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;
      color: #444444;
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
