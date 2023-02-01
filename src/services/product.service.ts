import { Product } from "../types";
import { http } from "./http.service";

export const getProducts = async (): Promise<Product[]> => {
    return await (await http.get('/products', {
        baseURL: 'https://fakestoreapi.com'
    })).data
}
