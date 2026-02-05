import {TaskPriority, TaskStatus} from "@/common/enums";

export type DomainTask = {
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    items: DomainTask[]
    totalCount: number
    error: string | null
}


export type UpdateTaskModel = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}
