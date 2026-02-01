import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import s from "./TodolistItem.module.css"
import {createTaskAC} from "@/features/todolists/model/tasks-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import type {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({todolist: {id, filter, title},}: Props) => {
    // const [_error, _setError] = useState<string | null>(null)

    const dispatch = useAppDispatch()
    const createTask = (taskTitle: string) => {
        dispatch(createTaskAC({todolistId: id, title: taskTitle}))
    }

    return (
        <div className={s.todolist}>
            <TodolistTitle todolist={{id, filter, title}}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={{id, filter, title}}/>
            <FilterButtons todolist={{id, filter, title}}/>
        </div>

    )
}
