import React from 'react'
import { Container } from './styles'
import Header from '~/components/Header/index'

export default function DefaultLayout({ children }) {
  return(
    <Container>
      <Header/>
      {children}
    </Container>
  )
}
