import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import gallerySlice from '../features/gallery/gallery.slice';
import productsSlice from '../features/products.slice';
import userTodoSlice from '../features/userTodo/userTodoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userTodo: userTodoSlice,
    gallery: gallerySlice,
    product: productsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
