import { Text, View, Image } from 'react-native';
import CardHeader from './CardHeader';
import CardStats from './CardStats';

export default function RepositoryItem({ repo }) {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <CardHeader repo={repo} />
      <CardStats repo={repo} />
    </View>
  );
}
