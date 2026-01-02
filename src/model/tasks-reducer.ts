import type {TasksState} from "../App.tsx";
import {v1} from "uuid";
import type {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initState: TasksState = {}

export const deleteTaskAc = (payload: { todolistId: string, taskId: string }) => {
    return {type: "delete-task", payload} as const
}
export const createTaskAC = (payload: { todolistId: string, title: string }) => {
    return {type: "create-task", payload} as const
}
export const changeTaskStatusAc = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {type: "change-task-status", payload} as const
}
export const changeTaskTitleAc = (payload: { todolistId: string, taskId: string, title: string }) => {
    return {type: "change-task-title", payload} as const
}

export type DeleteTaskAction = ReturnType<typeof deleteTaskAc>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAc>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAc>
type Actions = DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction |CreateTodolistAction |DeleteTodolistAction

export const tasksReducer = (state: TasksState = initState, action: Actions) => {
    switch (action.type) {
        case "create-todo" :
           return {...state, [action.payload.todolistId]: []}
        case "delete-todo": {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        case "delete-task":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case "create-task": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "change-task-status":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        case "change-task-title":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }

        default:
            return state;
    }
}
