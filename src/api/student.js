import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const instance = axios.create({

    baseURL: 'http://167.172.183.158' // from ngrok http 3000 expired after 2 h


});


instance.interceptors.request.use(
    async (config) => {


        const token = await AsyncStorage.getItem('student_token');


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