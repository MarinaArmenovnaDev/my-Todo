import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {Button} from "@/common/components/Button/Button.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTaskTC, updateTaskTC} from "@/features/todolists/model/tasks-slice.ts";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import s from "./TaskItem.module.css"
import type {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "@/common/enums";

type Props = {
    task: DomainTask
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {

    const dispatch = useAppDispatch();

    const deleteTask = () => {
        dispatch(deleteTaskTC({todolistId: todolistId, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(
            updateTaskTC({
                todolistId,
                taskId: task.id,
                domainModel: { status: newStatus },
            }),
        )
    }
    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title } }))
    }
    return (
        <li key={task.id} className={`${s.listItem} ${task.status ? s.completed : ''}`}>
            <div className={s.taskContent}>
                <input
                    type="checkbox"
                    checked={task.status ===  TaskStatus.Completed}
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
