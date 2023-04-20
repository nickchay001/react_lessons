import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a30c8a49-1458-41f4-857f-df9a1e5c1f62"
    }
})





export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}


export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount:number
    error: string | null
}


