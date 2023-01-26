import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useQuery } from 'react-query';
import { getTodos, getUsers } from '../../services/user.service';
import { RootState } from '../../store/store';
import { ITodo, IUser } from '../../types';

type Status = 'idle' | 'loading' | 'failed';
export interface UserTodoState {
  users: IUser[];
  userStatus: Status;
  todos: ITodo[],
  todoStatus: Status;
}

const initialState: UserTodoState = {
  users: [],
  userStatus: 'idle',
  todos: [],
  todoStatus: 'idle',
};

export const getUserAsync = createAsyncThunk(
  'userTodo/fetchUser',
  async () => {
    // how to use UseQuery();
    // const {data} = useQuery('getTodo', () => getUsers());
    // return data;
    return await getUsers();
  }
);

export const getTodosAysnc = createAsyncThunk(
  'userTodo/fetchTodo',
  async (userId: number) => {
    return await getTodos(userId)
  }
)

export const userTodoSlice = createSlice({
  name: 'userTodo',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.userStatus = 'idle';
        state.users = action.payload;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.userStatus = 'failed';
      })
      .addCase(getTodosAysnc.pending, (state) => {
        state.todoStatus = 'loading'
      })
      .addCase(getTodosAysnc.fulfilled, (state, action) => {
        state.todoStatus = 'idle'
        state.todos = action.payload // response
      })
      .addCase(getTodosAysnc.rejected, (state) => {
        state.todoStatus = 'failed'
      })
  },
});

// export const {  } = userTodoSlice.actions;

// * selector
export const selectTodos = (state: RootState) => state.userTodo.todos;
export const selectUsers = (state: RootState) => state.userTodo.users;
export const selectUserStatus = (state: RootState) => state.userTodo.userStatus;
export const selectTodoStatus = (state: RootState) => state.userTodo.todoStatus;


export default userTodoSlice.reducer;
