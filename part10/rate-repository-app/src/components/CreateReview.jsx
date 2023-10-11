import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import { CREATE_REVIEW } from '../graphql/mutations';

export default function CreateReview({ handleSubmitTest }) {
  const navigate = useNavigate();
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error);
    },
  });

  const initialValues = {
    ownerName: '',
    repoName: '',
    rating: '',
    review: '',
  };
  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('ownerName is required'),
    repoName: yup
      .string()
      .required('repoName is required'),
    rating: yup
      .number()
      .required('rating is required')
      .min(1)
      .max(100),
    review: yup
      .string(),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            rating: Number(values.rating),
            repositoryName: values.repoName,
            text: values.review,
          },
        },
      });
      navigate(`/${data.createReview.repository.id}`);
    } catch (e) {}
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitTest || handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={{ alignItems: 'center' }}>
          <FormikTextInput name="ownerName" placeholder="Repository owner" />
          <FormikTextInput name="repoName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating betwen 0-100" />
          <FormikTextInput name="review" placeholder="Review" />
          <Pressable
            onPress={handleSubmitTest || handleSubmit}
            style={{
              justifyContent: 'center',
              backgroundColor: '#38509C',
              width: '80%',
              height: 30,
            }}
          >
            <Text style={{ alignSelf: 'center', color: 'white' }}>Create Review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}
