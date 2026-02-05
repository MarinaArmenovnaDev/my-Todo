import s from "./Tasks.module.css";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";
import type {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {fetchTasksTC, selectTasks} from "@/features/todolists/model/tasks-slice.ts";
import {useEffect} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TaskStatus} from "@/common/enums";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist: {id, filter}}: Props) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id]);

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === "active") {
        filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.New)
    }
    if (filter === "completed") {
        filteredTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed)
    }
    return (
        <>
            {filteredTasks?.length === 0 ?
                (<p>no tasks</p>) : (
                    <ul className={s.taskList}>
                        {filteredTasks?.map((task) => {
                            return (
                                <TaskItem task={task} todolistId={id} key={task.id}/>
                            );
                        })}
                    </ul>
                )
            }
        </>
    )
}
