import { View, Text } from 'react-native';

export default function CardStats({ repo }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ padding: 8, flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {repo.stargazersCount}
          </Text>
          <Text>
            Stars
          </Text>
        </View>
        <View style={{ margin: 8, flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {repo.forksCount}
          </Text>
          <Text>
            Forks
          </Text>
        </View>
        <View style={{ margin: 8, flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {repo.reviewCount}
          </Text>
          <Text>
            Reviews
          </Text>
        </View>
        <View style={{ margin: 8, flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {repo.ratingAverage}
          </Text>
          <Text>
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
}
