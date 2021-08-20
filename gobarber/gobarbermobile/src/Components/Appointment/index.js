import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Left, Avatar, Info, Name, Time} from './styles';

export default function Appointment({data, onCancel}) {
  const parsedDate = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date());
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/rocketseat.png ${
                  data.provider.name
                }`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{parsedDate}</Time>
        </Info>
      </Left>

      {data.cancellable && !data.cancelled_at && (
        <TouchableOpacity onPress={() => onCancel()}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
