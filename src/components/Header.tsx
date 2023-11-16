import {View, Text, Button} from 'react-native'
import { useSession } from '../components/Contexto'
import { getItemAsync } from 'expo-secure-store'
import { useEffect, useState } from 'react'

export default function Header() {

    const {session, signOut} = useSession()
    const [nome, setNome] = useState(null)
    
    useEffect(() => {
        const fecthNome = async () => {
            const name = await getItemAsync('nome')
            setNome(name || '')
        }

        fecthNome()
    }, [])

    return (
        <View className='bg-white justify-between items-center py-2 border flex-row px-2'>
            <Text>Bem vindo, {nome}</Text>
            <Button title='Log-Out' onPress={() => signOut()} />
        </View>
    )
}