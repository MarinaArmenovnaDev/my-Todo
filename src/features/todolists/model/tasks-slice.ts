import {createTodolistTC, deleteTodolistTC} from "@/features/todolists/model/todolists-slice.ts"
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import type {DomainTask, UpdateTaskModel} from "@/features/todolists/api/tasksApi.types.ts";
import type {RootState} from "@/app/store.ts";
import {setAppStatusAC} from "@/app/app-slice.ts";
import {ResultCode} from "@/common/enums";

export const tasksSlice = createAppSlice({
    name: "tasks",
    initialState: {} as TasksState,
    selectors: {
        selectTasks: (state) => state,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
    reducers: (create) => {
        return {
            fetchTasksTC: create.asyncThunk(async (todolistId: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.getTasks(todolistId)
                    thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                    return {todolistId, tasks: res.data.items}
                } catch (e) {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'failed' }))
                    return thunkAPI.rejectWithValue(e)
                }
            }, {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }),
            deleteTaskTC: create.asyncThunk(async (arg: { todolistId: string, taskId: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.deleteTask(arg)
                    if(res.data.resultCode === ResultCode.Success){
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return arg
                    }else{
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error: any) {
                   handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
                    if (index !== -1) {
                        state[action.payload.todolistId].splice(index, 1)
                    }
                }
            }),
            createTaskTC: create.asyncThunk( async (arg: { todolistId: string; title: string }, thunkAPI)  => {
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.createTask(arg)
                    if(res.data.resultCode === ResultCode.Success){
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return {task: res.data.data.item}
                    }else{
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }
            }),
            updateTaskTC: create.asyncThunk(async (arg: {
                todolistId: string,
                taskId: string,
                domainModel: Partial<UpdateTaskModel>
            }, thunkAPI) => {
                const {todolistId, domainModel, taskId} = arg

                const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
                const task = allTodolistTasks.find((task) => task.id === taskId)
                if (!task) {
                    return thunkAPI.rejectWithValue(null)
                }

                const model: UpdateTaskModel = {
                    description: task.description,
                    title: task.title,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    status: task.status,
                    ...domainModel,
                }
                try {
                    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
                    const res = await tasksApi.updateTask({todolistId, taskId, model})
                    if(res.data.resultCode === ResultCode.Success){
                        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
                        return {task: res.data.data.item}
                    }else{
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    const tasks = state[action.payload.task.todoListId]
                    const index = tasks.findIndex(el => el.id === action.payload.task.id)
                    if (index !== -1) {
                        tasks[index] = action.payload.task
                    }
                }
            }),
        }
    },

})
export const { selectTasks } = tasksSlice.selectors
export const { deleteTaskTC, fetchTasksTC, createTaskTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer


export type TasksState = Record<string, DomainTask[]>
