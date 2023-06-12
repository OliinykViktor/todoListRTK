import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useHttp from '../../hooks/http.hook';

const initialState = {
    todos:[],
    todosLoadingStatus: 'idle',
}

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async() =>{
        const {request} = useHttp();
        return await request("http://localhost:3001/todos")
    }
)

const TodosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{
        todosCreated: (state, action)=>{
                state.todos.push(action.payload);
            },
        todosDeleted: (state, action) => {
                state.todos = state.todos.filter(item => item.id !== action.payload); 
            }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending,  state => {
                state.todosLoadingStatus = 'Loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                console.log(action.payload)
                state.todosLoadingStatus = 'idle';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, state =>{
                state.todosLoadingStatus = 'error';
            })
            .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = TodosSlice;

export default reducer;

export const{
    todosFetching,
    todosFetched,
    todosFetchingError,
    todosCreated,
    todosDeleted
} = actions;