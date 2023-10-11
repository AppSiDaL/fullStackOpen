import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

export default function SignUp({ handleSubmitTest }) {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error);
    },
  });
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required('Username is required'),
    password: yup.string().min(5).max(50).required('PassWord is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Password does not match')
      .required('Required'),
  });

  const handleSubmit = async ({ username, password }) => {
    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      await signIn({ username, password });
    } catch (e) {}
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitTest || handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FormikTextInput name="username" placeholder="UserName" />
          <FormikTextInput
            name="password"
            placeholder="PassWord"
            secureTextEntry
          />
          <FormikTextInput
            name="passwordConfirm"
            placeholder="Confirm"
            secureTextEntry
          />
          <Pressable
            onPress={handleSubmitTest || handleSubmit}
            style={{
              justifyContent: 'center',
              backgroundColor: '#38509C',
              width: '80%',
              height: 30,
            }}
          >
            <Text style={{ alignSelf: 'center', color: 'white' }}>Sing Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}
