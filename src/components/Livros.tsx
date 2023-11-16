import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    ScrollView,
    Text,
    Image,
    Pressable
} from 'react-native';
import { getLivros } from '../services/requisicoes';
import { Link } from 'expo-router';
import { useSession } from './Contexto'; 

function Livros() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getLivros(setDados, 3);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
           <FlatList
            data={dados}
            renderItem={({ item }) => {
                
                const isLink = item.fotoCapa ? true : false
                const modLink = isLink ? item.fotoCapa.dropboxLinkView.replace(
                    "https://www.dropbox.com/",
                    "https://dl.dropboxusercontent.com/"
                ) : null
        
                return (
                    <Link href={{ pathname: "/livro/[id]", params: { id: item.id }}} className="bg-white rounded-md shadow-md m-3 p-2" asChild>
                        <Pressable className='flex-row'>
                            <Image source={{uri :modLink}} className="w-24 h-36" resizeMode="cover" />
                            <View className='flex-1 pl-2'>
                                <Text className="font-bold text-md" >{item.titulo}</Text>
                                <Text className='text-xs'>{item.autor}</Text>
                            </View>
                        </Pressable>
                     </Link>
                );
            }}
            keyExtractor={(item) => item.id.toString()}
            />
    );
}

export default Livros;