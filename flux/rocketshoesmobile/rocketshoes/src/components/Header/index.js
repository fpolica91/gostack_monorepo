import React from 'react';
import {connect} from 'react-redux';
import {
  Wrapper,
  Logo,
  Container,
  BasketButton,
  ItemCount,
  HomeButton,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({navigation, inCart}) => {
  console.tron.log(inCart);
  return (
    <>
      <Wrapper>
        <Container>
          <HomeButton onPress={() => navigation.navigate('Home')}>
            <Logo />
          </HomeButton>
          <BasketButton onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-basket" color="#FFF" size={24} />
            <ItemCount>{inCart}</ItemCount>
          </BasketButton>
        </Container>
      </Wrapper>
    </>
  );
};

export default connect(state => ({
  inCart: state.cart.length,
}))(Header);
