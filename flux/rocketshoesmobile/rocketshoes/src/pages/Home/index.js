import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import {
  Container,
  List,
  Title,
  Wrapper,
  ProductImage,
  Price,
  AddButton,
  ButtonText,
  ButtonCount,
  ButtonContent,
} from './styles';
import {price} from '../../utils/format';
import {bindActionCreators} from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';
import {connect} from 'react-redux';

const Home = ({navigation, addItemToCartRequest}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    LoadProducts();
  }, []);

  const LoadProducts = async () => {
    const response = await api.get('products');
    setProducts(response.data);
  };

  const addToCart = product => {
    addItemToCartRequest(product.id);
    // bottom shows what you do before using mapDispatchtoprops
    // dispatch({
    //   type: '@cart/ADD_TO_CART',
    //   product,
    // });
  };

  return (
    <Wrapper>
      <List
        horizontal
        data={products}
        keyExtractor={product => String(product.id)}
        renderItem={({item}) => (
          <Container>
            <ProductImage source={{uri: item.image}} />
            <Title>{item.title}</Title>
            <Price>{price(item.price)}</Price>
            <AddButton onPress={() => addToCart(item)}>
              <ButtonContent>
                <ButtonCount>0</ButtonCount>
                <Icon name="add-shopping-cart" color="#FFF" size={20} />
              </ButtonContent>
              <ButtonText>Add To Cart</ButtonText>
            </AddButton>
          </Container>
        )}
      />
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
export default connect(
  null,
  mapDispatchToProps,
)(Home);

Home.navigationOptions = {
  title: 'Home',
};
