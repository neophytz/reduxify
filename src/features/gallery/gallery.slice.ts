import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { RootState } from "../../store/store";
import { AlbumImage, Status } from "../../types";
import { getImages } from "./gallery.service";

export interface GalleryState {
    images: AlbumImage[],
    imagesStatus: Status,
    currentImage: number | null,
}

const initialState: GalleryState = {
    images: [],
    imagesStatus: 'idle',
    currentImage: null
}

export const getGalleryAction = createAsyncThunk(
    'gallery/fetchGallery', async () => await getImages()
)

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        updateCurrentImage: (state, action: PayloadAction<number>) => {
            state.currentImage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGalleryAction.pending, (state) => {
            state.currentImage = null;
            state.imagesStatus = "loading";
        })
        .addCase(getGalleryAction.fulfilled, (state, action) => {
            state.images = action.payload;
            state.imagesStatus = "idle";
            toast('Hello World', {
                duration: 4000,
                position: 'top-center',
                icon: '🎉',
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
              });
            if(action.payload.length > 0){
                state.currentImage = action.payload[0].id
            }
        })
        .addCase(getGalleryAction.rejected, (state) => {
            state.imagesStatus = 'failed'
            state.currentImage = null;
        })
    }
})

/**------------ simple actions ---------------- */
export const { updateCurrentImage } = gallerySlice.actions;

/**------------ selector ---------------- */
export const galleryImages = (state: RootState) => state.gallery.images;

export const currentImage = (state: RootState) => {
    const cImgId = state.gallery.currentImage;
    if (typeof cImgId !== 'number') return undefined;
    return state.gallery.images.find(el => el.id === cImgId)
}

export const galleryStatus = (state: RootState) => state.gallery.imagesStatus;

export default gallerySlice.reducer;