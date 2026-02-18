import s from "./Tasks.module.css";
import {useAppSelector} from "@/common/hooks";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";
import type {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {fetchTasksTC, selectTasks} from "@/features/todolists/model/tasks-slice.ts";
import {useEffect} from "react";
import {useAppDispatch} from "@/common/hooks";
import {TaskStatus} from "@/common/enums";

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist
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
    const taskListClass = todolist.entityStatus === "loading" ? `${s.taskList} ${s.disabled}` : s.taskList
    return (
        <>
            {filteredTasks?.length === 0 ?
                (<p className={todolist.entityStatus === "loading" ? s.disabledText : ""}>
                    no tasks
                </p>) : (
                    <ul className={taskListClass}>
                        {filteredTasks?.map((task) => {
                            return (
                                <TaskItem task={task} key={task.id} todolist={todolist} />
                            );
                        })}
                    </ul>
                )
            }
        </>
    )
}
