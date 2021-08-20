/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Background from '~/Components/Background';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimeInput from '~/Components/DateTimeInput';
import { Container, HourList, Hour, Title } from './styles';
import api from '~/services/api';
export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailability() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailability();
  }, [date, provider.id]);

  function handleConfirm(time) {
    navigation.navigate('Confirm', {
      time,
      provider,
    });
  }

  return (
    <Background>
      <Container>
        <DateTimeInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          extraData={date}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleConfirm(item.value)}
              enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Select  Time',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
