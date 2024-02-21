import { Slot, Stack } from 'expo-router';
import { SessionProvider } from '../components/Contexto'
import BdTeste from './BdTeste';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
    //<BdTeste />
  );
}