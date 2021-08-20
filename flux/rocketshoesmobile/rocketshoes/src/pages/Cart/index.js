import React from 'react';
import {price} from '../../utils/format';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Container,
  Products,
  Product,
  ProductImage,
  ProductTitle,
  ProductInfo,
  ProductDetails,
  ProductPrice,
  ProductControls,
  ProductSubtotal,
  ProductAmount,
  ProductControlButton,
  TotalContainer,
  TotalText,
  TotalPrice,
  CheckOutButton,
  CheckOutText,
  EmptyContainer,
  EmptyText,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

const Cart = ({
  navigation,
  cart,
  dispatch,
  total,
  removeFromCart,
  updateCartRequest,
}) => {
  const Increment = product => {
    updateCartRequest(product.id, product.amount + 1);
    // dispatch({
    //   type: '@cart/UPDATE_CART',
    //   product,
    //   amount: product.amount + 1,
    // });
  };
  const Decrement = product => {
    updateCartRequest(product.id, product.amount - 1);
    // dispatch({
    //   type: '@cart/UPDATE_CART',
    //   product,
    //   amount: product.amount - 1,
    // });
  };

  const RemoveItem = id => {
    removeFromCart(id);
    // dispatch({
    //   type: '@cart/REMOVE_ITEM',
    //   id,
    // });
  };
  return (
    <Container>
      {cart.length ? (
        <>
          <Products>
            {cart.map(product => (
              <Product key={String(product.id)}>
                <ProductInfo>
                  <ProductImage
                    source={{
                      uri: product.image,
                    }}
                  />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{price(product.price)}</ProductPrice>
                  </ProductDetails>
                  <ProductControlButton onPress={() => RemoveItem(product.id)}>
                    <Icon name="delete-forever" size={20} color="#7152c1" />
                  </ProductControlButton>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => Decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7152c1"
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton onPress={() => Increment(product)}>
                    <Icon name="add-circle-outline" size={20} color="#7152c1" />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>Total</TotalText>
            <TotalPrice>{total}</TotalPrice>
            <CheckOutButton>
              <CheckOutText>Check Out</CheckOutText>
            </CheckOutButton>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon size={60} color="#e0e0e0" name="remove-shopping-cart" />
          <EmptyText>Your Cart Is Empty</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: price(product.price * product.amount),
  })),
  total: price(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
