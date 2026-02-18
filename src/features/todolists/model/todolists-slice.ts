import {todolistApi} from "@/features/todolists/api/todolistApi.ts";
import type {Todolist} from "@/features/todolists/api/todolistApi.types.ts";
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";
import type {RequestStatus} from "@/common/types";
import {ResultCode} from "@/common/enums";

export type FilterValue = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
    filter: FilterValue
    entityStatus: RequestStatus
}

export const todolistsSlice = createAppSlice({
    name: "todolists",
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: (state) => state
    },
    reducers: (create) => ({
        fetchTodolistsTC: create.asyncThunk(async (_arg, thunkAPI) => {
            try {
                thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                const res = await todolistApi.getTodolist()
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolist: res.data}
            } catch (e) {
                thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
                return thunkAPI.rejectWithValue(e)
            }
        }, {
            fulfilled: (_state, action) => {
                return action.payload.todolist.map(el => {
                    return {...el, filter: "all", entityStatus: "idle"}
                })
            }
        }),
        deleteTodolistTC: create.asyncThunk(async (id: string, thunkAPI) => {
            try {
                thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                thunkAPI.dispatch(changeTodolistStatusAC({todolistId: id, entityStatus: 'loading'}))
                const res = await todolistApi.deleteTodolist(id)
                if (res.data.resultCode === ResultCode.Success) {
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return {id}
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            } catch (error: any) {
                handleServerNetworkError(error, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        }, {
            fulfilled: (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }
        }),
        changeTodolistTitleTC: create.asyncThunk(async (arg: { todolistId: string, title: string }, thunkAPI) => {
            try {
                thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                const res = await todolistApi.changeTodolistTitle(arg)
                if (res.data.resultCode === ResultCode.Success) {
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return arg
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            } catch (error: any) {
                handleServerNetworkError(error, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        }, {
            fulfilled: (state, action) => {
                const todolist = state.find(el => el.id === action.payload.todolistId)
                if (todolist) {
                    todolist.title = action.payload.title
                }
            }
        }),
        createTodolistTC: create.asyncThunk(async (title: string, thunkAPI) => {
            try {
                thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
                const res = await todolistApi.createTodolist(title)
                if (res.data.resultCode === ResultCode.Success) {
                    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                    return {todolist: res.data.data.item}
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            } catch (error: any) {
                handleServerNetworkError(error, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
        }, {
            fulfilled: (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            }
        }),
        changeTodolistFilterAC: create.reducer<{
            todolistId: string,
            filter: FilterValue
        }>((state, action) => {
            const todolist = state.find(el => el.id === action.payload.todolistId)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        }),
        changeTodolistStatusAC: create.reducer<{ todolistId: string, entityStatus: RequestStatus }>((state, action) => {
            const todolist = state.find(el => el.id === action.payload.todolistId)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        })
    }),
})


export const {selectTodolists} = todolistsSlice.selectors
export const {
    changeTodolistFilterAC,
    changeTodolistStatusAC,
    fetchTodolistsTC,
    createTodolistTC,
    deleteTodolistTC,
    changeTodolistTitleTC
} =
    todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
