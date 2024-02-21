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
import { Link, Stack } from 'expo-router';
import { openDatabase } from "expo-sqlite";
import { useSession } from './Contexto';
import { getLivros } from '../services/requisicoes';
import { criarTabelaLivro } from '../database/tabelas';
import { inserirLivro, selectLivros } from '../database/consultas';
import livro from '../types/livro';

function Livros() {
    const db = openDatabase('banco_teste')
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const persistirDados = async () => {

        try {
            criarTabelaLivro(db)

            dados.forEach(async (livros) => {

                const book:livro = {
                    id : livros.id,
                    titulo : livros.titulo,
                    subtitulo : livros.subtitulo,
                    editora : livros.editora,
                    autor : livros.autor,
                    sinopse : livros.sinopse,       
                    anoEdicao : livros.anoEdicao
                }

                await inserirLivro(db, book)
            })

            console.log("Dados persistidos")

        } catch (error) {
            console.log(error)
        }
    }

    const consultarBD = async () => {
        try {
            const livros = await selectLivros(db)
            console.log(livros[1])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getLivros(setDados, 0);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
        //persistirDados();
        //consultarBD();
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
            <>
            <Stack.Screen
                options={{
                title: dados ? "Livros" : "Carregando...",
            }} />

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
            </>
    );
}

export default Livros;