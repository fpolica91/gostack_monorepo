import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileRequest} from '~/store/modules/user/actions';
import {signOut} from '~/store/modules/auth/actions';
import Background from '~/Components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Form,
  FormInput,
  Title,
  SubmitButton,
  LogOutButton,
  Separator,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const emailRef = useRef();
  const OldpasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassworld] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    setPassword('');
    setOldPassworld('');
    setConfirmPassword('');
  }, [profile]);

  return (
    <Background>
      <Container>
        <Title>Profile</Title>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Full Name"
            returnKeyType="next"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Enter your email"
            ref={emailRef}
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => OldpasswordRef.current.focus()}
          />

          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Enter your current password"
            ref={OldpasswordRef}
            returnKeyType="next"
            value={oldPassword}
            onChangeText={setOldPassworld}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Enter your new password"
            ref={passwordRef}
            returnKeyType="next"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Enter your password"
            ref={confirmPasswordRef}
            returnKeyType="send"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Update Profile</SubmitButton>
          <LogOutButton onPress={handleLogout}>Exit GoBarber</LogOutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({tintColor}) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
