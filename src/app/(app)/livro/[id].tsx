import { useEffect, useState } from "react";
import { getLivro, listarReservaLivro, fazerReservaLivro } from "../../../services/requisicoes";
import livro from "../../../types/livro";
import {View, Text, Image , ScrollView, SafeAreaView, Button} from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSession } from "../../../components/Contexto";
import { getItemAsync } from 'expo-secure-store';

export default function Livro() {
    const [dados, setDados] = useState<livro>(null)
    const [imgLink, setImgLink] = useState<string | null>(null)
    const [reserva, setReserva] = useState<boolean>(false)
    const [dadosReserva, setDadosReserva] = useState<boolean>(false)
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const linkPattern = () => {
        imgLink ?  setImgLink(imgLink.replace(
            "https://www.dropbox.com/",
            "https://dl.dropboxusercontent.com/"
        )) : null
    }

    const handleReserva = async () => {
        const colaborador = await getItemAsync('idColaborador')
        const resp = await fazerReservaLivro(colaborador, id, new Date())
       
        if (resp) {
            setReserva(true)
        }
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

    useEffect(() => {
        const fetchListagem = async () => {
            const resp = await listarReservaLivro(id)
            const idColaborador = await getItemAsync('idColaborador')
            resp !== null ? setDadosReserva(true) : setDadosReserva(false)

            if (resp && resp.length > 0 && idColaborador) {
                
                const isColaboradorReservado = resp.some(
                  (item) => item.reservaColaboradorId === parseInt(idColaborador)
                );

                isColaboradorReservado ? setReserva(true) : setReserva(false)
            } else {
                console.log("livro não possui nenhuma reserva")
            }
            
        }
        fetchListagem()
    },[])

    return (
        <SafeAreaView className="items-center justify-center py-2">
             <Stack.Screen
                options={{
                title: dados ? dados.titulo : "Carregando...",
            }}
            />
            <ScrollView className="">
                {dados && dadosReserva ? (
                    <View className="items=center justify-center">
                            <View className="items-center">
                                <Image width={200} height={300} source={imgLink ? {uri : imgLink} : require('../../../../assets/cover.jpg')}></Image>
                            </View>
                        <Text className="text-center text-2xl font-semibold mt-4">{dados.titulo}</Text>
                        <Text className="text-center text-lg font-medium text-gray-500">{dados.autor}</Text>
                        <Text className="text-xs font-medium mt-4 text-justify px-2">{dados.sinopse}</Text>
                        <Text className="text-center text-md mt-1">{dados.anoEdicao}</Text>
                        <View className="justify-center items-center shadow mt-4">
                            <Button title="Reservar" disabled={reserva} onPress={handleReserva}/>
                            {reserva ? (
                                <Text className="text-red-600 text-xs">Você já fez reserva desse livro</Text>
                            ) : (null)}
                        </View>
                    </View>
                    ) :  (<Text className="text-center justify-center text-2xl mt-4">Carregando...</Text>)}
            </ScrollView>
        </SafeAreaView>
    )
}