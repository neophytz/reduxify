import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { RootState } from "../store/store";
import { CartItem, Product } from "../types";

type StateCartItem = {
    id: number,
    quantity: number
}

export interface ProductsState {
    products: Product[],
    categories: string[],
    cart: StateCartItem[],
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
    cart: []
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
            toast.success("Successfully loaded products and saved in store", {className: 'p-4', duration: 2000})
        },
        addCartItem: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const itemIdx = state.products.findIndex(el => el.id === id);
            // if item does not exist, it return undefined.
            if(itemIdx === -1) {
                toast.error("Item does not exist, please add correct item.");
                return
            }

            // if the item does not exist, add it.
            // if exist, increment the quantity!

            let _cartItemIndex = state.cart.findIndex(item => item.id === id);
            if (_cartItemIndex === -1) { // if the item does not exist.
                const _cartItem: StateCartItem = {
                    id: id,
                    quantity: 1
                }
                state.cart.push(_cartItem)
            } else {
                state.cart[_cartItemIndex].quantity += 1;
            }
            const name = state.products[itemIdx].title;
            toast.success(`'${name}' added to your cart.`)
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const idx = state.cart.findIndex(item => item.id === productId);
            if(idx !== -1){
                if(state.cart[idx].quantity === 1) {
                    state.cart.splice(idx, 1);
                } else {
                    state.cart[idx].quantity -= 1;
                }
                toast.success("Item removed from cart, successfully")
            } else {
                toast.error("Item does not exist in cart, What the fuck is happending!!");
            }
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

export const { setProducts, removeCartItem, addCartItem } = productsSlice.actions;

/*--------- selection ----------*/
export const productCategories = (store: RootState) => store.product.categories;
export const products = (store: RootState) => store.product.products;
export const cartItems = (state: RootState) => {
    // item list - cart;
    // original items - products;
    const cartIds = state.product.cart, products = state.product.products;
    const cartItem: CartItem[] = [];
    
    cartIds.forEach(item => {
        cartItem.push({
            ...products.find(product => product.id === item.id) as Product,
            quantity: item.quantity
        })
    })

    // const val = cartIds.map(item => (
    //     {
    //         ...products.find(el => el.id === item.id) as Product,
    //         quantity: item.quantity
    //     }
    // ))
    return cartItem;
}

export default productsSlice.reducer;