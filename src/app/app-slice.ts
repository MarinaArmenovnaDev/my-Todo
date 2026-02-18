import { createSlice } from "@reduxjs/toolkit"
import type { RequestStatus } from "@/common/types"

export const appSlice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatus,
        error: null as string | null,
    },
    selectors: {
        selectStatus: (state) => state.status,
        selectAppError: (state) => state.error
    },
    reducers: (create) => ({
        setAppStatusAC: create.reducer<{status: RequestStatus}>((state, action)=>{
            state.status = action.payload.status
        }),
        setAppErrorAC: create.reducer<{error: null | string}>((state, action)=>{
            state.error = action.payload.error
        })
    }),
})

export const { selectStatus, selectAppError } = appSlice.selectors
export const { setAppStatusAC, setAppErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer
