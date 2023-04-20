import {ResultCodeEnum, ResponseType, ResultCodeForCaptchaEnum, instance } from "./api";




type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseType = {
    userId: number
}


export const authAPI = {
    /*me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
        .then(res => res.data);
    },*/
    async me() {
        const res = await instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const res = await instance.post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}