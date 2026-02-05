import {configureStore} from '@reduxjs/toolkit'
import {todolistsReducer, todolistsSlice} from "@/features/todolists/model/todolists-slice.ts";
import {tasksReducer, tasksSlice} from "@/features/todolists/model/tasks-slice.ts";
import {appReducer, appSlice} from "@/app/app-slice.ts";


export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [tasksSlice.name]: tasksReducer,
        [todolistsSlice.name]: todolistsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
