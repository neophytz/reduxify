import { ITodo, IUser } from "../types"
import { http } from "./http.service"

export const getUsers = async (): Promise<IUser[]> => {
    console.log('backend call?')
    return await (await http.get('/users')).data
}

// users/1/todos
export const getTodos = async (userId: number): Promise<ITodo[]> => {
    return await (await http.get(`/users/${userId}/todos`)).data
}

// type FooConfig = {
//     datefrom: Date, 
//     dateto: Date, 
//     isbn: string | number, 
//     search: string
// }

/** DYNAMIC PARAMs.
 * host.com/v1.0/search/datefrom/{datefrom}/dateto/{dateto}/isbn/{isbn}/provider/{search}
 * host.com/v1.0/search?datefrom={}&dateto={}&isbn={}&provider={}
*/
// export const foo = async (mode: 'params'| 'queryParam', config: FooConfig): Promise<any> => {
//     const {datefrom, dateto, search, isbn} = config;
//     if(mode === 'params') {
//         return await (await http.get(`/search/datefrom/${datefrom}/dateto/${dateto}/isbn/${isbn}/provider/${search}`)).data
//     } else {
//         return await http.post(`/search`, null, {
//             params: {
//                 // datefrom: datefrom,
//                 // dateto: dateto,
//                 // isbn: isbn,
//                 datefrom, dateto, isbn, 
//                 provider: search
//             }
//         })
//     }
// }

export const getPhotos = async (photoId: number, params: any) => {
    return await (await http.get(`/photos`, {
        params: {
            ...params,
            // photoId: params.photoId,
            // locationId: params.locationId,
            // photoGUID: params.photoGUID,
        }
    })).data
}