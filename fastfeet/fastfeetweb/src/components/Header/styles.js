import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  padding: 0 30px;
  width: 100%;
`

export const Content = styled.div`
  height: 64px;

  /* ; */
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 26px;
    }
  }

  aside {
    display: flex;
    /* margin-right: auto; */
    align-items: center;
    a {
      margin: 10px;
      font-size: 15px;
      font-weight: bold;
      color: #999999;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #333;
    }
  }
`
