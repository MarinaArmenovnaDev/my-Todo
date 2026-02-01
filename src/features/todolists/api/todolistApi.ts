import {instance} from "@/common/instance";
import type {BaseResponse} from "@/common/types";
import type {Todolist} from "@/features/todolists/api/todolistApi.types.ts";

export const todolistApi = {
    getTodolist() {
        return instance.get<Todolist[]>("/todo-lists")
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`)
    },
    changeTodolistTitle(payload:{todolistId: string, title: string}){
        const {todolistId, title} = payload
        return instance.put(`/todo-lists/${todolistId}`, {title})
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{item: Todolist}>>("/todo-lists", {title})
    }

}
