import styled, { keyframes } from 'styled-components'
import signupBakground from '../../components/assets/singup.png'
import { shade } from 'polished'

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: -176px auto 0;
`

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(+50px);
  }
  to{
    opacity: 1;
    transform: translatex(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 20px;
      margin-bottom: 20px;
      text-align: left;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`
export const Background = styled.div`
  flex: 1;
  background: url(${signupBakground}) no-repeat center;
  background-size: cover;
`

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;
    input {
      display: none;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`
