import { useEffect, useState } from "react";
import { inserirLivro, removerLivro, selectLivros, limparTabela } from "../../database/consultas";
import { criarTabelaLivro } from "../../database/tabelas";
import { openDatabase } from "expo-sqlite";
import { View, Text, Button} from "react-native"
import livro from "../../types/livro";

function BdTeste () {
    const [livros, setLivros] = useState([])
    const db = openDatabase('banco teste')

    const livroTeste:livro = {
        id : null,
        titulo : "teste",
        subtitulo : "Outro teste",
        fotoCapa : "http://www.google.com",
        editora : "Testinha",
        autor : "Eu",
        sinopse : "Era uma vez um teste...",       
        anoEdicao : "2023"
    } 

    const insertLivro = () => {
        inserirLivro(db, livroTeste)
    }

    const clearTabela = () => {
        limparTabela(db, 'livro')
    }

    const getLivros = async () => {
        try {
            const books = await selectLivros(db)
            console.log(books)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        //criarTabelaLivro(db)
        //limparTabela(db, 'livro')
        //inserirLivro(db, livroTeste)
        //getLivros()
        /*
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE livro'
            ), [], (_, result) => {
                console.log('deu bom')
            }
        })*/
    }, [])

    return (
        <View className="items-center justify-center flex-1">
            <Text className="text-center text-lg font-semibold">Testando...</Text>
            <View className="">
                <Button title="Adicionar Livro" color={"green"} onPress={insertLivro}/>
                <Button title="Limpar Tabela" color={"red"} onPress={clearTabela} />
                <Button title="Carregar bd" color={"blue"} onPress={getLivros} />
            </View>
        </View>
    )
}

export default BdTeste