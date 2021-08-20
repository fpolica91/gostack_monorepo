import styled from 'styled-components/native';

import logo from '../../assets/Logo.png';

export const Wrapper = styled.SafeAreaView`
  flex: 0;
  background: #000000;
  flex-direction: row;
`;

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

export const HomeButton = styled.TouchableOpacity``;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`;

export const BasketButton = styled.TouchableOpacity`
  height: 24px;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ItemCount = styled.Text`
  text-align: center;
  top: -8px;
  padding: 2px;
  border-radius: 8px;
  font-size: 12px;
  right: -8px;
  position: absolute;
  color: #fff;
  overflow: hidden;
  background: #7159c1;
`;
