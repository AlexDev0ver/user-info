import axios from 'axios';

import { logout } from '../redux/actions';
import store from '../redux/store';

class ApiClient {

    constructor() {
        axios.defaults.baseURL = "http://erp.apptrix.ru/api/clients";

        axios.interceptors.request.use(
            config => {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    config.headers.common['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    alert("Wrong email or password");
                    axios.post(`/token/refresh/${localStorage.getItem('refreshToken')}/`).then(response => {
                        localStorage.setItem('accessToken', response.data.access);
                        if (response.error) {
                            alert(error.response.data.detail)
                            localStorage.clear();
                            store.dispatch(logout())
                        }
                    })
                } else if (error.response.status === 400) {
                    Object.values(error.response.data).forEach(el => {
                        if (typeof el === Object) {
                            alert(Object.values(el))
                        } else {
                            alert(Object.values(el))
                        }
                    })
                } else {
                    console.log(error.response.data)
                }

                return Promise.reject(error);
            }
        )
    }

    login(username, password) {
        return axios.post(`/token/`, {
            username,
            password
        })
    };

    signUp(email, password, phone, name, surname) {
        return axios.post(`/create/`, {
                user: {
                    email,
                    password
                },
                phone,
                invited_by: "RU-637164",
                name,
                surname,
                country_key: "RU"
            }
        );
    };

    getUser(id) {
        return axios.get(`/${id}/`)
    }
}

const api = new ApiClient();

export default api;
