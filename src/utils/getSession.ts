import { getItemAsync } from 'expo-secure-store';
import { useStorageState } from '../components/UseStorage';

import axios from 'axios';

const getAxios = async (timeout = 30000) => {

    try {
        const token = await getItemAsync('token')

        const instance = axios.create({
            timeout: timeout,
            headers: {
                'Authorization': 'Bearer ' +  token
            }
        });

        return instance
    } catch (error) {
        console.error(error)
    }
}

export default getAxios;
