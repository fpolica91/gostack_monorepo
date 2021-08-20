import styled from 'styled-components/native';
import Input from '~/Components/Input';
import Button from '~/Components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Form = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
  margin-top: 50px;
`;
export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogOutButton = styled(Button)`
  margin-top: 10px;
  background: #f64c75;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;
