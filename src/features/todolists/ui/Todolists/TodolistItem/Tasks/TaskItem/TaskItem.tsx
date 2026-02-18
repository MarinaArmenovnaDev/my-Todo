import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {Button} from "@/common/components/Button/Button.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTaskTC, updateTaskTC} from "@/features/todolists/model/tasks-slice.ts";
import type {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks";
import s from "./TaskItem.module.css"
import type {DomainTask} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskStatus} from "@/common/enums";
import type {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}

export const TaskItem = ({task, todolist}: Props) => {

    const dispatch = useAppDispatch();

    const deleteTask = () => {
        dispatch(deleteTaskTC({todolistId:todolist.id, taskId: task.id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(
            updateTaskTC({
                todolistId: todolist.id,
                taskId: task.id,
                domainModel: { status: newStatus },
            }),
        )
    }
    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC({ todolistId: todolist.id, taskId: task.id, domainModel: { title } }))
    }
    return (
        <li key={task.id} className={`${s.listItem} ${task.status ? s.completed : ''}`}>
            <div className={s.taskContent}>
                <input
                    type="checkbox"
                    checked={task.status ===  TaskStatus.Completed}
                    onChange={changeTaskStatus}
                    className={s.taskCheckbox}
                    disabled={todolist.entityStatus === "loading"}
                />
                <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitle}
                    disabled={todolist.entityStatus === "loading"}
                />
            </div>
            <Button onClick={deleteTask} disabled={todolist.entityStatus === "loading"}>
                <DeleteIcon/>
            </Button>
        </li>
    )
}
