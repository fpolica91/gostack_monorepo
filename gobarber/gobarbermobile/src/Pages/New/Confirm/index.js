import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../../Components/Background';
import {Container, Avatar, Time, Name, SubmitButton} from './styles';
import {formatRelative, parseISO} from 'date-fns';
import api from '~/services/api';
export default function Confirm({navigation}) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');
  const formattedDate = useMemo(
    () => formatRelative(parseISO(time), new Date()),
    [time],
  );
  console.tron.log(time);

  async function handleSubmit() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });
    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/rocketseat.png ${
                  provider.name
                }`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{formattedDate}</Time>
        <SubmitButton onPress={handleSubmit}>Confirm Appointment</SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({navigation}) => ({
  title: 'Confirm Appointment',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
