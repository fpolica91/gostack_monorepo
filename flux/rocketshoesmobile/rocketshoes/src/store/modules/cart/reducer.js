import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_TO_CART_SUCCESS':
      return produce(state, draft => {
        draft.push(action.product);
        // const inCart = state.findIndex(item => item.id === action.product.id);
        // if (inCart >= 0) {
        //   draft[inCart].amount += 1;
        // } else {
        //   draft.push({
        //     ...action.product,
        //     amount: 1,
        //   });
        // }
      });
    case '@cart/UPDATE_CART_SUCCESS':
      return produce(state, draft => {
        const productIndex = state.findIndex(item => item.id === action.id);
        if (productIndex >= 0) {
          if (draft[productIndex].amount >= 0) {
            draft[productIndex].amount = Number(action.amount);
          }
        }
      });

    case '@cart/REMOVE_ITEM':
      return produce(state, draft => {
        const inCart = state.findIndex(item => item.id === action.id);
        if (inCart >= 0) {
          draft.splice(inCart, 1);
        }
      });

    //   return [...state, action.product];
    default:
      return [...state];
  }
}
