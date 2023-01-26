import { ITodo, IUser } from "../types"
import { http } from "./http.service"

export const getUsers = async (): Promise<IUser[]> => {
    console.log('backend call?')
    return await (await http.get('/users')).data
}

// users/1/todos
export const getTodos =async (userId:number): Promise<ITodo[]> => {
    return await (await http.get(`/users/${userId}/todos`)).data
}
