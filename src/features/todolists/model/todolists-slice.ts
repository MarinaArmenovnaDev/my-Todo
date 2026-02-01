import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todolistApi} from "@/features/todolists/api/todolistApi.ts";
import type {Todolist} from "@/features/todolists/api/todolistApi.types.ts";

export type FilterValue = "all" | "active" | "completed"
export type DomainTodolist = Todolist & { filter: FilterValue }

export const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as DomainTodolist[],
    selectors:{
        selectTodolists: (state)=> state
    },
    reducers: (create)=>({
        changeTodolistFilterAC: create.reducer<{
            todolistId: string,
            filter: FilterValue
        }>((state, action)=>{
            const todolist = state.find(el =>  el.id === action.payload.todolistId)
            if(todolist){
                todolist.filter = action.payload.filter
            }
        })
    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
                return action.payload.todolists.map(el => {
                    return {...el, filter: "all"}
                })
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const todolist = state.find(el => el.id === action.payload.todolistId)
                if(todolist){
                    todolist.title = action.payload.title
                }
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: "all" })
            })


    }
})
export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_arg, thunkAPI) => {
    try {
        const res = await todolistApi.getTodolist()
        return {todolists: res.data}

    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const deleteTodolistTC = createAsyncThunk(`${todolistsSlice.name}/deleteTodolistTC`, async (id: string, thunkAPI) => {
    try {
        await todolistApi.deleteTodolist(id)
        return {id}
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const changeTodolistTitleTC = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitleTC`, async (arg: {
    todolistId: string,
    title: string
}, thunkAPI) => {
    try {
        await todolistApi.changeTodolistTitle(arg)
        return arg
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const createTodolistTC = createAsyncThunk(`${todolistsSlice.name}/createTodolistTC`, async (title: string, thunkAPI) => {
    try {
        const res = await todolistApi.createTodolist(title)
        return {todolist: res.data.data.item}
    }catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const {changeTodolistFilterAC} = todolistsSlice.actions
export const {selectTodolists}= todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
