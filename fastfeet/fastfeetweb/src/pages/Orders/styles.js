import styled, { css } from 'styled-components'
import PerfectScrollBar from 'react-perfect-scrollbar'

export const Container = styled.div`
  height: 100%;
  padding: 0 50px;
  overflow: hidden;
  display: flex;
  max-width: 900px;
  /* justify-content: center; */
  flex-direction: column;
  /* align-items: center; */
`

export const Scroll = styled(PerfectScrollBar)`
  max-height: 550px;
  padding: 5px 20px;
`

export const Modal = styled.div`
  display: ${(props) => (props.modal ? 'block' : 'none')};
  position: absolute;
  height: 120px;
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

export const Table = styled.table`
    border-collapse:separate; 
    border-spacing:0 12px;
  /* border-collapse: collapse; */
   
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
  }
`

export const Span = styled.div`
  background: ${(props) =>
    props.statusColor === 'delivered'
      ? '#DFF0DF'
      : 'pending'
      ? '#F0F0DF'
      : 'retrieved'
      ? '#BAD2FF'
      : '##FAB0B0'} };
  position: relative;
  padding: 3px 12px;
  width: 85px;

  /* padding-right: 2px; */
  text-transform: uppercase;
  font-size: 12px;
  color: ${(props) =>
    props.statusColor === 'delivered'
      ? '#2ca42b'
      : 'pending'
      ? '#C1BC35'
      : 'retrieved'
      ? '#4D85EE'
      : '#DE3B3B'} }
  border-radius: 10px;

  ${(props) =>
    props.statusColor &&
    css`
      :before {
        content: '';
        position: absolute;
        width: 8px;
        left: 0.2em;
        top: 0.5em;
        height: 8px;
        background: ${(props) =>
          props.statusColor === 'delivered'
            ? '#2ca42b'
            : 'pending'
            ? '#C1BC35'
            : 'retrieved'
            ? '#4D85EE'
            : '#DE3B3B'};
        border-radius: 50%;
      }
    `}
`

export const Courier = styled.div`
  position: relative;

  span {
    margin-right: 3px;
    background: #f4effc;
    border-radius: 50%;
    color: #a28fd0;
  }
`
