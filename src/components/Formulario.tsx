import { View, Button, Text, TextInput } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from "../types/login";
import { doLogin } from "../services/requisicoes";
import { router } from 'expo-router';

export default function Formulario() {

    const {control, reset, handleSubmit} = useForm({
        defaultValues : {
            "login" : "",
            "senha" : ""
        }
    })

    const setToken = async (token:string) => {
        try {
            await AsyncStorage.setItem('token', token)
            //console.log('deu certo')
        } catch (error) {
            //console.log("deu ruim")
            console.error(error)
        }
    }

    const onSubmit = async (data) => {
        const {login, senha} = data
        const resp = await doLogin(login, senha)
        await setToken(resp.token)
        await router.replace('/livros');
    }

    return (
        <View className="bg-white p-2 shadow-lg rounded-md flex-1 justify-center items-center">
            <View className="w-80">

                <Text className="text-2xl font-semibold text-center mb-4">Faça seu login</Text>

                <Text className="text-lg font-semibold pb-1 pl-1">Login</Text>
                <Controller control={control} rules={{required: true}} render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput placeholder="Login" onBlur={onBlur} onChangeText={onChange} value={value} className="rounded-md border border-slate-300 text-xl h-12 pl-2  mb-1"/>
                    )}
                    name="login"
                />

                <Text className="text-lg font-semibold pb-1 pl-1">Senha</Text>
                <Controller control={control} rules={{required: true, maxLength: 20}} render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput placeholder="Senha" onBlur={onBlur} onChangeText={onChange} value={value} maxLength={20} secureTextEntry={true} className="rounded-md border text-xl border-slate-300 h-12 pl-2 "/>
                    )}
                    name="senha"
                />

            </View>
            <View className="w-1/3 mt-4 ">
                <Button title="Confirmar" onPress={handleSubmit(onSubmit)}/>
            </View>
        </View>
    )
}