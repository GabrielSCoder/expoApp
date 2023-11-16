import { useEffect, useState } from "react";
import { getLivro } from "../services/requisicoes";
import livro from "../types/livro";
import {View, Text, Image , ScrollView, SafeAreaView} from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import { useSession } from "./Contexto";

export default function LivroVisu() {
    const [dados, setDados] = useState<livro>(null)
    const {session} = useSession()

    useEffect(() => {
        getLivro("80", setDados)
    }, [])

    return (
        <SafeAreaView className="items-center">
            <ScrollView className="">
                {dados ? (
                    <View>
                        {dados.fotoCapa ? (
                            <View className="items-center">
                                <Image width={250} height={400} source={{uri : 'https://dl.dropboxusercontent.com/s/c4kqcfd72hh14jx/414M718Vv4L._SX334_BO1%2C204%2C203%2C200__10112022145915.jpg?dl=0'}}></Image>
                            </View>
                        ) : ""}
                        <Text className="text-center text-3xl font-medium mt-1">{dados.titulo}</Text>
                        <Text className="text-center text-md font-semibold text-gray-500">{dados.autor}</Text>
                        <Text className="text-xs mt-4 text-justify px-2">{dados.sinopse}</Text>
                        <Text className="text-center">{dados.editora}</Text>
                    </View>
                    ) :  <Text>Carregando...</Text> }
            </ScrollView>
        </SafeAreaView>
    )
}