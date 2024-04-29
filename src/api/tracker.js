import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const instance = axios.create({

    baseURL: 'http://167.172.183.158'


});


instance.interceptors.request.use(
    async (config) => {


        const token = await AsyncStorage.getItem('driver_token');

      


        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;