/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {withNavigationFocus} from 'react-navigation';
import api from '~/services/api';
import Background from '~/Components/Background';
import Appointment from '~/Components/Appointment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Title, List} from './styles';

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              cancelled_at: response.data.cancelled_at,
            }
          : appointment,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <Title>Schedule</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({tintColor}) => (
    <Icon color={tintColor} name="event" size={20} />
  ),
};

export default withNavigationFocus(Dashboard);
