import {todolistApi} from "@/features/todolists/api/todolistApi.ts";
import type {Todolist} from "@/features/todolists/api/todolistApi.types.ts";
import {createAppSlice} from "@/common/utils";
import {setAppStatusAC} from "@/app/app-slice.ts";

export type FilterValue = "all" | "active" | "completed"
export type DomainTodolist = Todolist & { filter: FilterValue }

export const todolistsSlice = createAppSlice({
    name: "todolists",
    initialState: [] as DomainTodolist[],
    selectors: {
        selectTodolists: (state) => state
    },
    reducers: (create) => ({
        fetchTodolistsTC: create.asyncThunk(async (_arg, thunkAPI) => {
            try {
                thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                const res = await todolistApi.getTodolist()
                thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                return {todolist: res.data}
            } catch (e) {
                thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                return thunkAPI.rejectWithValue(e)
            }
        }, {
            fulfilled: (_state, action) => {
                return action.payload.todolist.map(el => {
                    return {...el, filter: "all"}
                })
            }
        }),
        deleteTodolistTC: create.asyncThunk(async (id: string, thunkAPI) => {
            try {
                thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                await todolistApi.deleteTodolist(id)
                thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                return {id}
            } catch (e) {
                thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                return thunkAPI.rejectWithValue(e)
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
                thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                await todolistApi.changeTodolistTitle(arg)
                thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                return arg
            } catch (e) {
                thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                return thunkAPI.rejectWithValue(e)
            }
        }, {
            fulfilled: (state, action) => {
                const todolist = state.find(el => el.id === action.payload.todolistId)
                if (todolist) {
                    todolist.title = action.payload.title
                }
            }
        }),
        createTodolistTC: create.asyncThunk(async (title: string, thunkAPI)=>{
            try {
                thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                const res = await todolistApi.createTodolist(title)
                thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                return {todolist: res.data.data.item}
            }catch (e) {
                thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                return thunkAPI.rejectWithValue(e)
            }
        }, {
            fulfilled: (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all"})
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
        })
    }),
})


export const { selectTodolists } = todolistsSlice.selectors
export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } =
    todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
