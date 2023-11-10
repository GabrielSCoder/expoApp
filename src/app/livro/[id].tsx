import { useEffect, useState } from "react";
import { getLivro } from "../../services/requisicoes";
import livro from "../../types/livro";
import {View, Text, Image , ScrollView, SafeAreaView} from 'react-native'
import { TextInput } from "react-native-gesture-handler";
import { useLocalSearchParams } from 'expo-router';

export default function Livro() {
    const [dados, setDados] = useState<livro>(null)
    const [imgLink, setImgLink] = useState<string | null>(null)
    const { id } = useLocalSearchParams()

    const linkPattern = () => {
        imgLink ?  setImgLink(imgLink.replace(
            "https://www.dropbox.com/",
            "https://dl.dropboxusercontent.com/"
        )) : null
    }

    useEffect(() => {
        const fetch = async () => {
            const resp = await getLivro(id, setDados)
            await resp.fotoCapa ? setImgLink(resp.fotoCapa.dropboxLinkView) : setImgLink(null)
        }
        fetch()
    }, [])

    useEffect(() => {
        linkPattern()
    },[imgLink])

    return (
        <SafeAreaView className="items-center justify-center">
            <ScrollView className="">
                {dados ? (
                    <View className="items=center justify-center">
                            <View className="items-center">
                                <Image width={250} height={400} source={imgLink ? {uri : imgLink} : require('../../../assets/cover.jpg')}></Image>
                            </View>
                        <Text className="text-center text-3xl font-medium mt-1 text-red-500">{dados.titulo}</Text>
                        <Text className="text-center text-lg font-semibold text-gray-500">{dados.autor}</Text>
                        <Text className="text-xs mt-4 text-justify px-2">{dados.sinopse}</Text>
                        <Text className="text-center text-md mt-1">{dados.anoEdicao}</Text>
                    </View>
                    ) :  <Text>Carregando...</Text> }
            </ScrollView>
        </SafeAreaView>
    )
}