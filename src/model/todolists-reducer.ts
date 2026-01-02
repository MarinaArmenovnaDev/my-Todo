import type {FilterValue, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []


export const deleteTodolistAC = (todolistId: string) => {
    return {type: "delete-todo", payload: {todolistId}} as const
}

export const createTodolistAC = (title: string) => {
    const todolistId = v1()
    return {type: "create-todo", payload: {title, todolistId}} as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string, title: string }) => {
    return {type: "change-todo-title", payload} as const
}

export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterValue }) => {
    return {type: "change-todo-filter", payload} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>


type Action = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitle | ChangeTodolistFilterAction
export const todolistsReducer = (state: Todolist[] = initialState, action: Action) => {
    switch (action.type) {
        case "delete-todo" :
            return state.filter(el => el.id !== action.payload.todolistId)
        case "create-todo": {
            const newTodo: Todolist = {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
            return [newTodo, ...state]
        }
        case "change-todo-title":
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.title} : el)
        case "change-todo-filter":
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)

        default:
            return state
    }
}
