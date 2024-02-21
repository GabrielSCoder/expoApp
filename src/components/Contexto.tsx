import React, { useEffect } from 'react';
import { setStorageItemAsync, useStorageState } from './UseStorage';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { router } from 'expo-router';
import { doLogin, tokenValidate, pegarDadosColaborador } from '../services/requisicoes';

const AuthContext = React.createContext<{ signIn: (token:string) => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (data) => {

    try {
      const {login, senha} = await data
      const res = await doLogin(login, senha)

      if (res) {
        setSession(res.token);
        setStorageItemAsync('token', res.token)
        setStorageItemAsync('nome', res.nome)
        const resp = await pegarDadosColaborador()
        setStorageItemAsync('idColaborador', String(resp.data.dados.colaboradorId))
      }
    } catch(error) {
      console.error(error)
    }
  }

  const signOut = () => {
    setSession(null);
    setStorageItemAsync('token', null)
    setStorageItemAsync('nome', null)
  }

  const validtoken = async () => {
    const token = await getItemAsync('token')
    const validate = await tokenValidate(token)

    if (validate) {
      setSession(validate.data.dados.token)
      setStorageItemAsync('token', validate.data.dados.token)
      router.replace('/')
    } else {
      signOut()
      console.log("sem token") 
    }
  }

  useEffect(() => {
    validtoken()
  }, [session])

  return (
    <AuthContext.Provider
      value={{
        signIn: signIn,
        signOut: signOut,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
