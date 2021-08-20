import React, {useMemo} from 'react';
import {format} from 'date-fns';
import {DatePickerAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, DateButton, DateText} from './styles';

export default function DateTimeInput({date, onChange}) {
  const dateFormatted = useMemo(() => format(date, "MMMM dd  'of' yyyy "), [
    date,
  ]);

  async function handleOpenPicker() {
    const {action, year, month, day} = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });
    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);
      onChange(selectedDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  );
}
