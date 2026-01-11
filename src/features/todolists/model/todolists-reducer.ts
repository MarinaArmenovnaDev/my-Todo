import type {FilterValue, Todolist} from "@/app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{ todolistId: string }>("todolists/deleteTodolist")

export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
    return {payload: { title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>("todolists/changeTodolistTitle")

export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValue
}>("todolists/changeTodolistFilter")

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index !== -1) {
                state.splice(index, 1);
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: "all"})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if(index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const index = state.findIndex(el => el.id ===action.payload.todolistId)
            if(index !== -1) {
                state[index].filter = action.payload.filter
            }
        })
})
