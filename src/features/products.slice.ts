import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { getProducts } from "../services/product.service";
import { Product } from "../types";

export interface ProductsState {
    products: Product[],
    categories: string[],
    // filter: {
    //     categories: string[],
    //     rating: {
    //         min: number,
    //         max: number,
    //     },
    //     price: {
    //         min: number,
    //         max: number
    //     }
    // }
    // filteredProducts: Product[]
}

const initialState : ProductsState = {
    categories: [],
    products: [],
}

/*------------------------ async action ------------------------ */
// export const fetchProducts = createAsyncThunk(
//     'get/products', async () => await getProducts()
// )

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            const products = action.payload;
            state.products = products;

            const uniq = Object();
            products.forEach(el => uniq[el.category] = 1);
            state.categories = Object.keys(uniq);
            toast('product set done.')
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(fetchProducts.pending, (state) => {
    //         state.productStatus = 'loading'
    //     })
    //     .addCase(fetchProducts.fulfilled, (state, action) => {
    //         const products = action.payload;
    //         state.productStatus = 'idle';
    //         state.products = products;

    //         const uniq = Object()
    //         products.forEach(el => uniq[el.category] = 1);
    //         state.categories = Object.keys(uniq);
    //         toast('Here is your toast.', {
    //             duration: 1000,
    //         });
    //     })
    //     .addCase(fetchProducts.rejected, (state) => {
    //         state.productStatus = 'failed'
    //         toast('Could not fetch products, something went wrong.', {
    //             duration: 4000,
    //             position: 'top-right',
    //             icon: '❌',
    //             iconTheme: {
    //               primary: '#000',
    //               secondary: '#fff',
    //             },
    //             ariaProps: {
    //               role: 'status',
    //               'aria-live': 'polite',
    //             },
    //         });
    //     })
    // }
})

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;