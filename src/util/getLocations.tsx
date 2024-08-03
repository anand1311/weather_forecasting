import GetLocation from 'react-native-get-location';

export async function getCurrentLocation() {
  const loc = await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  });
  return loc;
}
