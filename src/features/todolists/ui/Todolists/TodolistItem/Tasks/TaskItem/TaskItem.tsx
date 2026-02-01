import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {Button} from "@/common/components/Button/Button.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-slice.ts";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import type {Task} from "@/app/App.tsx";
import s from "./TaskItem.module.css"

type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {

    const dispatch = useAppDispatch();

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId: todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId: todolistId, taskId: task.id, isDone: newStatusValue}))
    }
    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC({todolistId: todolistId, taskId: task.id, title: newTitle}))
    }
    return (
        <li key={task.id} className={`${s.listItem} ${task.isDone ? s.completed : ''}`}>
            <div className={s.taskContent}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                    className={s.taskCheckbox}
                />
                <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitle}
                />
            </div>
            <Button onClick={deleteTask}>
                <DeleteIcon/>
            </Button>
        </li>
    )
}
