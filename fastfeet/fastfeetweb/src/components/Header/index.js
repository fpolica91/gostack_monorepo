import React from 'react'
import { Container, Content, Profile } from './styles'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import logo from '~/assets/fastfeet-logo.png'

export default function Header() {
  const admin = useSelector((state) => state.admin.profile)
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="fastfeetLogo" />
        </nav>
        <aside>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/couriers">Couriers</NavLink>
          <NavLink to="/recipients">Recipients</NavLink>
          <NavLink to="/probs">Problems</NavLink>
          <Profile>
            <div>
              <strong>{admin.name}</strong>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
