import {configureStore} from '@reduxjs/toolkit'
import {todolistsReducer} from "@/features/todolists/model/todolists-slice.ts";
import {tasksReducer} from "@/features/todolists/model/tasks-slice.ts";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
