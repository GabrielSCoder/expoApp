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
                    <Link href={{ pathname: "/livro/[id]", params: { id: item.id }}} asChild>
                        <Pressable>
                            <View className="flex flex-row bg-white mt-2">
                                <View className='pl-2 '>
                                    {modLink ? (
                                        <Image width={80} height={80} source={{uri :modLink}} className="my-2 mr-6"/>
                                    ) : ""}
                                </View>
                                <View className='items-star justify-center'>
                                    <Text numberOfLines={2} className="font-bold ml-2 text-xs max-w-[90%]">{item.titulo}</Text>
                                    <Text numberOfLines={2} className="font-xs text-slate-600 ml-2 max-w-[90%] text-xs flex-shrink">{item.autor}</Text>
                                </View>
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