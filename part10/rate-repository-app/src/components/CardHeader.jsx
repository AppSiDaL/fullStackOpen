import { Text, View, Image } from 'react-native';

export default function CardHeader({ repo }) {
  return (
    <View style={{ flexDirection: 'row', flexGrow: 1 }}>
      <View style={{
        flexGrow: 0,
        padding: 15,
      }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            resizeMode: 'cover',
          }}
          source={{ uri: repo.ownerAvatarUrl }}
        />
      </View>
      <View style={{ flexGrow: 1, paddingTop: 15 }}>
        <Text style={{ padding: 2, fontWeight: 'bold' }}>{repo.fullName}</Text>
        <Text style={{ padding: 2, color: '#586069' }}>{repo.description}</Text>
        <View style={{ flex: 0 }}>
          <Text style={{
            padding: 2, backgroundColor: '#0366d6', alignSelf: 'flex-start', color: 'white',
          }}
          >
            {repo.language}
          </Text>
        </View>
      </View>
    </View>
  );
}
