import React from 'react';
import {
  Pressable, View, Text,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

export default function BodyMassIndexForm() {
  const [signIn] = useSignIn();

  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('PassWord is required'),
  });

  const handleSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(
        { handleSubmit }, // Cambia submit por handleSubmit
      ) => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FormikTextInput name="username" placeholder="UserName" />
          <FormikTextInput
            name="password"
            placeholder="PassWord"
            secureTextEntry
          />
          <Pressable
            onPress={handleSubmit}
            style={{
              justifyContent: 'center',
              backgroundColor: '#38509C',
              width: '80%',
              height: 30,
            }}
          >
            <Text style={{ alignSelf: 'center', color: 'white' }}>
              Login
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}
