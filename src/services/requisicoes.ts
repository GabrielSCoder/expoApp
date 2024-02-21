import axios from 'axios'
import getAxios from '../utils/getSession'


export const getLivros = async (setDados, pagina) => {
    try {

        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/livro/listagem";

        const data = {
            "pageSize": 10,
            "currentPage": pagina,
            "pesquisa": null,
            "livroCategoriaId": null
        }

        const res = await axiosInstance.post(req_url, data)
        await setDados(res.data.dados.dados)
        //console.log(res.data.dados.dados)
        
    } catch (error) {
        console.error(error)
        console.log("error")
    }
}

export const getLivros2 = async (setDados, pagina) => {
    try {

        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/livro/listagem"

        const data = {
            "pageSize": 10,
            "currentPage": pagina,
            "pesquisa": null,
            "livroCategoriaId": null
        }

        const res = await axiosInstance.post(req_url, data)
        await setDados(res.data.dados.dados)
        //console.log(res.data.dados.dados)
        
    } catch (error) {
        console.error(error)
    }
}

export const doLogin = async (username: string, password : string) => {

    
    try {
        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/auth/login"
        
        const data = {
            "email" : username,
            "senha" : password
        }
        
        const resp = await axiosInstance.put(req_url, data) 

        //console.log(resp.data.dados)
        return resp.data.dados
    } catch (error) {
        console.error(error)
    }
}

export const getLivro = async(livroId:string | string[], setDados) => {

    try {
        const axiosInstance = await getAxios()

        const req_url = `https://beta-api-new.plasfran.com/api/livro/${livroId}`

        const response = await axiosInstance.get(req_url)

        await setDados(response.data.dados)
        return response.data.dados
    } catch (error) {
        console.error(error)
       // console.log("erro")
    }
}

export const tokenValidate = async (token : string) => {

    try {

        const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
        }

        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/sessao/validar/"

        const response = await axiosInstance.get(req_url, config)
        
        //console.log(response.data.dados)

        return response

    } catch (error) {
        return null
    }
}

export const pegarDadosColaborador = async () => {
    
    try {

    
        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/auth/logado"

        const response = await axiosInstance.get(req_url)
        
        console.log(response.data.dados.colaboradorId)
        return response

    } catch (error) {
        console.error(error)
    }

}

export const fazerReservaLivro = async (idColaborador:string, livroId: number | string | string[], dataReserva: Date) => {

    try {
        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/LivroReserva"

        const data = {
            "colaboradorId": idColaborador,
            "livroId": livroId,
            "dataReserva": dataReserva
        }

        const response = await axiosInstance.post(req_url, data)
        console.log("Deu bom")
        return response
    } catch (error) {
        console.error(error)
    }
}

export const listarReservaLivro = async (idLivro) => {

    try {

        const axiosInstance = await getAxios()

        const req_url = "https://beta-api-new.plasfran.com/api/LivroReserva/ListaPendente"

        const data = {
            "pageSize": 10,
            "currentPage": 0,
            "pesquisa": "",
            "dataInicio": "2022-01-01",
            "dataFim": new Date(),
            "livroId": idLivro
        }

        const response = await axiosInstance.post(req_url, data)
        //console.log(response.data.dados.dados[0].listaReserva)
        return response.data.dados.dados[0].listaReserva

    } catch (error) {
        //console.error(error)
        return false
    }
}