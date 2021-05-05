import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Auth, Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import { Authenticator, withAuthenticator } from 'aws-amplify-react-native';
import { AmplifyTheme } from './components/AmplifyTheme'

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('Error signing out: ', error);
  }
}


const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
  ],
}

const App = () => {
  return (
    <View style={styles.container}>
      <Text> React Native + Amplify </Text>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <StatusBar style="auto" />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App, {
  signUpConfig: signUpConfig,
  usernameAttributes: "email",
  theme: AmplifyTheme
});