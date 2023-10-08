import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accesToken = await AsyncStorage.getItem(
      `${this.namespace}:AccessToken`,
    );

    return accesToken ? JSON.parse(accesToken) : [];
  }

  async setAccessToken(accessToken) {
    const currentAccessToken = await this.getAccessToken();
    const newAccessToken = [...currentAccessToken, accessToken];

    await AsyncStorage.setItem(
      `${this.namespace}:AccessToken`,
      JSON.stringify(newAccessToken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:AccessToken`);
  }
}

export default AuthStorage;
