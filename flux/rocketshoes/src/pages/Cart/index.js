import React from 'react'
import { Container, ProductTable, Total } from './styles'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../store/modules/cart/actions'
import { connect } from 'react-redux'
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from 'react-icons/md'

import { price } from '../../util/format'

const Cart = ({ cart, removeFromCart, updateAmountRequest, total }) => {
  function handleDelete(product) {
    removeFromCart(product)
    // dispatch({
    //   type: 'REMOVE_FROM_CART',
    //   product
    // });
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1)
  }
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1)
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Product</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(prod => (
            <tr key={prod.id}>
              <td>
                <img src={prod.image} alt="shoes" />
              </td>
              <td>
                <strong>{prod.title}</strong>
                <span>{prod.formatedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(prod)}>
                    <MdRemoveCircleOutline size={20} color="#999" />
                  </button>
                  <input type="number" readOnly value={prod.amount} />
                  <button type="button" onClick={() => increment(prod)}>
                    <MdAddCircleOutline size={20} color="#7150c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{prod.subtotal}</strong>
              </td>

              <td>
                <button type="button" onClick={() => handleDelete(prod)}>
                  <MdDelete size={20} color="#7150c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Check Out</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: price(product.price * product.amount)
  })),
  total: price(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount
    }, 0)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
