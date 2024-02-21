import { Redirect, Stack, Slot, useLocalSearchParams } from 'expo-router';
import {Text} from 'react-native'
import { useSession } from '../../components/Contexto'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const params = useLocalSearchParams()

  if (isLoading) {
    return <Text className='text-center'>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/LoginForm" />;
  }

  return (
      <Stack />
  )
}