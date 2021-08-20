import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  margin: 15px;
`;

export const Products = styled.View``;
export const Product = styled.View``;

export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductTitle = styled.Text.attrs({
  numberOfLines: 2,
})``;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
`;

export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const ProductControls = styled.View`
  flex-direction: row;
  justify-content: center;
  background: #eee;
  padding: 8px;
  border-radius: 4px;
`;

export const ProductSubtotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
`;

export const ProductControlButton = styled.TouchableOpacity``;

export const TotalContainer = styled.View`
  justify-content: center;
  top: 5px;
  align-items: center;
`;
export const TotalText = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  color: #999999;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const TotalPrice = styled.Text`
  font-weight: bold;
  font-size: 30px;
  top: 5px;
`;

export const CheckOutButton = styled.TouchableOpacity`
  margin-top: 40px;
  height: 42px;
  width: 315px;
  background: #7159c1;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
export const CheckOutText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const EmptyContainer = styled.View`
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;
