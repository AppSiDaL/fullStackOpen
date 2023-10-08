import React from 'react';
import {
  Pressable, View, Text, Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

export default function BodyMassIndexForm() {
  const initialValues = {
    username: null,
    password: null,
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('PassWord is required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
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
              Calculate
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}
