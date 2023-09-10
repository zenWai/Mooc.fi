import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import {Formik} from "formik";
import {useSignUp} from "../hooks/useSignUp";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" testID="usernameInput"/>
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID="passwordInput"/>
      <FormikTextInput name="passwordConfirmation" placeholder="Confirm Password" secureTextEntry={true} testID="passwordConfirmationInput"/>
      <TouchableOpacity style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const onSubmit = async values => {
    const { username, password } = values;

    try {
      const data = await signUp({ username, password });
      console.log('signUp success: ', data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('signUp function execution complete');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit}/>}
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

export default SignUp;