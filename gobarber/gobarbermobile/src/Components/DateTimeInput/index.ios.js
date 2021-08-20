import React, {useState, useMemo} from 'react';
import {format} from 'date-fns';
import {DatePickerIOS} from 'react-native';
import {Container, DateButton, DateText, Picker} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DateTimeInput({date, onChange}) {
  const [opened, setOpened] = useState(false);
  const formattedDate = useMemo(() => format(date, "MMMM  dd 'of' yyyy "), [
    date,
  ]);

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{formattedDate}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
