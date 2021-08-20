import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  padding: 0 50px;
  display: flex;
  max-width: 900px;
  flex-direction: column;
`
export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;

    margin: 30px 0;

    h2 {
      color: #000000;
    }
    input {
      margin-top: 20px;
      background: #ffffff;
      width: 170px;
      &::placeholder {
        text-align: center;
      }
    }
  }

  button {
    margin-top: 30px;
    background: #7d40e7;
    height: 36px;
    width: 142px;
    color: #fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Modal = styled.div`
  display: ${(props) => (props.modal ? 'block' : 'none')};
  position: absolute;
  height: 80px;
  width: 120px;
  border: 1px solid #9999;
  border-radius: 4px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 2px #00000026;

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;

    li {
      padding: 10px 0;
      border-bottom: 1px solid #9999;
      button {
        display: flex;
        svg {
          margin-right: 2px;
        }
      }
    }
  }
`

export const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 12px;
  thead th {
    color: #444444;
    text-align: left;
    padding: 12px;
  }
  tbody {
    padding: 12px;

    tr {
      background: #fff;

      td {
        color: #666666;
        padding: 12px;

        button {
          border: 0;
        }
        svg {
          margin-left: 12px;
        }
      }
    }
  }
`
export const Avatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`
