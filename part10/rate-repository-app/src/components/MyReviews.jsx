import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {
  Alert,
  FlatList, Pressable, Text, View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados (enero = 0)
  const year = date.getFullYear();

  const formattedDate = `${day.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year}`;

  return formattedDate; // Resultado: "08.10.2023"
};
function ReviewItem({ review }) {
  const navigator = useNavigate();
  const client = useApolloClient();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error);
    },
  });
  const createTwoButtonAlert = () => Alert.alert('Delete review', 'Are you sure to delete?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: async () => {
        const { data, refetch } = await deleteReview({
          variables: {
            deleteReviewId: review.node.id,
          },
        });
        client.resetStore();
      },
    },
  ]);
  return (
    <View style={{ flexDirection: 'row', flexGrow: 1 }}>
      <View
        style={{
          flexGrow: 0,
          padding: 15,
          width: 60,
        }}
      >
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'red',
            borderRadius: (review.node.rating / 100) * 30,
            width: 30,
            height: 30,
            textAlign: 'center',
            lineHeight: 30,
          }}
        >
          {review.node.rating}
        </Text>
      </View>
      <View style={{ flexGrow: 1, paddingTop: 15 }}>
        <Text style={{ padding: 2, fontWeight: 'bold' }}>
          {review.node.user.username}
        </Text>
        <Text style={{ padding: 2, color: '#586069' }}>
          {formatTime(review.node.createdAt)}
        </Text>
        <Text style={{ padding: 2 }}>{review.node.text}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{ backgroundColor: 'blue', padding: 5, marginRight: 10 }}
          >
            <Pressable
              onPress={() => {
                navigator(`/${review.node.repository.id}`);
              }}
            >
              <Text style={{ color: 'white' }}>View Repo</Text>
            </Pressable>
          </View>
          <View style={{ backgroundColor: 'red', padding: 5 }}>
            <Pressable onPress={createTwoButtonAlert}>
              <Text style={{ color: 'white' }}>Delte Review</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

function ItemSeparator() {
  return (
    <View
      style={{
        height: 10,
        backgroundColor: '#CFD4B8',
      }}
    />
  );
}
export default function MyReviews() {
  const result = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
  if (result.loading) return null;
  return (
    <FlatList
      data={result.data.me.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem key={item} review={item} />}
    />
  );
}
