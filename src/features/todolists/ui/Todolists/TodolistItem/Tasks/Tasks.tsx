import s from "./Tasks.module.css";
import type {Task, Todolist} from "@/app/App.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist: {id, filter}}: Props) => {

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === "active") {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }
    return (
        <>
            {filteredTasks.length === 0 ?
                (<p>no tasks</p>) : (
                    <ul className={s.taskList}>
                        {filteredTasks.map((task: Task) => {
                            return (
                                <TaskItem task={task} todolistId={id}/>
                            );
                        })}
                    </ul>
                )
            }
        </>
    )
}
