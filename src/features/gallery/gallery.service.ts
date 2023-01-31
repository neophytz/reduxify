import { http } from "../../services/http.service"
import { AlbumImage } from "../../types"

export const getImages = async (): Promise<AlbumImage[]> => {
    return await (await http.get('/photos')).data
}