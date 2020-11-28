import api from '../../api/ApiClient';
import ACTION from '../action-enum';

export function setUser(payload) {
    return { type: ACTION.SET_USER, payload }
}

export function loginCreator() {
    return { type: ACTION.LOGIN }
}

export function logout() {
    localStorage.clear();
    return { type: ACTION.LOGOUT }
}

export const login = (username, password) => async(dispatch) => {
    const login = await api.login(username, password);

    if (login) {

        localStorage.setItem('accessToken', login.data.access);
        localStorage.setItem('clientId', login.data.client_id);
        localStorage.setItem('refreshToken', login.data.refresh);

        dispatch(loginCreator());
    }
}

export const signUp = (email, password, phone, name, surname) => async(dispatch) => {
    const data = await api.signUp(email, password, phone, name, surname).then(res => res.status);
    return data;
}

export const getUser = () => async(dispatch) => {
    const data = await api.getUser(localStorage.getItem('clientId')).then(res => res.data);
    dispatch(setUser(data));
}
