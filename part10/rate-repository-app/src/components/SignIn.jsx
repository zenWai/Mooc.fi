import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Text from './theme/Text'

import FormikTextInput from './FormikTextInput';
import {useSignIn} from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" testID="usernameInput"/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID="passwordInput"/>
      <TouchableOpacity style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log('signIn success: ', data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('signIn function execution complete');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignIn;