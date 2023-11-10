import axios from 'axios'
import livro from '../types/livro'

const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lVXN1YXJpbyI6IkVTVEFHSUFSSU8iLCJub21lQ29sYWJvcmFkb3IiOiJBTlRPTklPIEFNQVVSSSBCRVNFUlJBIERFIFNPVVNBIiwiaWRDb2xhYm9yYWRvciI6Ijg1NiIsImlkQ2FyZ28iOiI0MiIsImNhcmdvIjoiUEVEUkVJUk8iLCJpZFVzdWFyaW8iOiIyNTEiLCJhbWJpZW50ZSI6IlBST0QiLCJleHAiOjE2OTk2Nzg4NjksImlzcyI6IkJPWDNfRVJQX0FQSSIsImF1ZCI6Imh0dHBzOi8vcGxhc2ZyYW4uY29tIn0.HDWMeMbownKWsHFfuaHlqWTSFM9_aAu-q9mREMNzh88"

export const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
}

export const getLivros = async (setDados, pagina) => {
    try {
        const req_url = "https://beta-api-new.plasfran.com/api/livro/listagem"

        const data = {
            "pageSize": 10,
            "currentPage": pagina,
            "pesquisa": null,
            "livroCategoriaId": null
        }

        const res = await axios.post(req_url, data, config)
        await setDados(res.data.dados.dados)
        console.log(res.data.dados.dados)
    } catch (error) {
        console.error(error)
    }
}

export const doLogin = async (username: string, password : string) => {

    try {
        const req_url = "https://beta-api-new.plasfran.com/api/auth/login"

        const data = {
            "email" : username,
            "senha" : password
        }

        const res = await axios.put(req_url, data, config)
        console.log(res.data.dados)
        return res.data.dados
    } catch (error) {
        console.error(error)
    }
}

export const getLivro = async(livroId:string | string[], setDados) => {
    try {
        const req_url = `https://beta-api-new.plasfran.com/api/livro/${livroId}`
        const response = await axios.get(req_url, config)
        await setDados(response.data.dados)
        return response.data.dados
    } catch (error) {
        console.error(error)
        console.log("erro")
    }
}

