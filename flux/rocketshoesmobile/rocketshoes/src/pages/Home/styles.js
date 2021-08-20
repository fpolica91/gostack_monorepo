import styled from 'styled-components/native';

export const Wrapper = styled.View`
  background: #0000;
`;
export const Container = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;
export const List = styled.FlatList``;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;
export const Title = styled.Text`
  font-size: 16px;
`;

export const Price = styled.Text`
  font-size: 20px;
  margin: 14px 0;
  margin-bottom: 14px;
  font-weight: bold;
`;

export const AddButton = styled.TouchableOpacity`
  background: #7159c1;
  flex-direction: row;
  border-radius: 4px;
  align-items: center;
  margin-top: auto;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  padding: 12px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  align-items: center;
  background: #5a479a;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
  flex: 1;
`;

export const ButtonCount = styled.Text`
  color: #fff;
  margin: 0px 4px 0 10px;
`;
