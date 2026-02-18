import {CreateItemForm} from "@/common/components";
import s from "./TodolistItem.module.css"
import {createTaskTC} from "@/features/todolists/model/tasks-slice.ts";
import {useAppDispatch} from "@/common/hooks";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import type {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {
    // const [_error, _setError] = useState<string | null>(null)

    const dispatch = useAppDispatch()
    const createTask = (taskTitle: string) => {
        dispatch(createTaskTC({todolistId: todolist.id, title: taskTitle}))
    }

    return (
        <div className={s.todolist}>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>

    )
}
