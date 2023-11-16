import axios from 'axios'
import getAxios from '../utils/getSession'


export const getLivros = async (setDados, pagina) => {
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

        console.log(resp.data.dados)
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
        
        console.log(response.data.sucesso)

        return response

    } catch (error) {
        return null
    }
}