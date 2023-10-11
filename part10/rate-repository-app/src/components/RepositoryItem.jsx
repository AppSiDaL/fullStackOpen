import {
  Text, View, Pressable, FlatList, Button,
} from 'react-native';
import { useParams, useNavigate } from 'react-router-native';
import * as Linking from 'expo-linking';
import { useQuery } from '@apollo/client';
import CardHeader from './CardHeader';
import CardStats from './CardStats';
import { GET_REVIEWS } from '../graphql/queries';
import useRepositories from '../hooks/useRepositories';
import useReviews from '../hooks/useReviews';

const formatTime = (isoDateString) => {
  const date = new Date(isoDateString);

  // Obtiene el día, mes y año del objeto Date
  const day = date.getDate();
  const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados (enero = 0)
  const year = date.getFullYear();

  // Formatea la fecha en "dd.mm.yyyy"
  const formattedDate = `${day.toString().padStart(2, '0')}.${month
    .toString()
    .padStart(2, '0')}.${year}`;

  return formattedDate; // Resultado: "08.10.2023"
};
function ReviewItem({ review }) {
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
      </View>
    </View>
  );
}

function ItemSeparator() {
  return (
    <View style={{
      height: 10,
      backgroundColor: '#CFD4B8',
    }}
    />
  );
}
export default function RepositoryItem({ repo, repos }) {
  const { repoId } = useParams();
  const navigate = useNavigate();
  let repoF;

  const { reviews, loading, fetchMore } = useReviews({
    first: 4,
    repositoryId: String(repoId),
  });
  const onEndReach = () => {
    fetchMore();
    console.log('fetching more');
  };
  if (loading) return null;
  console.log(reviews);
  if (repoId) {
    repoF = repos.filter((r) => r.node.id === repoId);
    return (
      <>
        <View testID="repositoryItem" style={{ backgroundColor: 'white' }}>
          <CardHeader repo={repoF[0].node} />
          <CardStats repo={repoF[0].node} />
          <Pressable
            onPress={() => Linking.openURL(repoF[0].node.url)}
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#38509C',
              width: '80%',
              height: 30,
            }}
          >
            <Text style={{ alignSelf: 'center', color: 'white' }}>
              Open in GitHub
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={reviews?.edges}
          onEndReachedThreshold={0.3}
          onEndReached={onEndReach}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewItem key={item} review={item} />}
        />
      </>
    );
  }
  return (
    <Pressable onPress={() => navigate(repo.node.id)}>
      <View testID="repositoryItem" style={{ backgroundColor: 'white' }}>
        <CardHeader repo={repo.node} />
        <CardStats repo={repo.node} />
      </View>
    </Pressable>
  );
}
