import s from "./TodolistTitle.module.css";
import {Trash} from "lucide-react";
import {
    changeTodolistTitleTC,
    deleteTodolistTC,
    type DomainTodolist
} from "@/features/todolists/model/todolists-slice.ts";
import {useAppDispatch} from "@/common/hooks";
import {Button, EditableSpan} from "@/common/components";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist: {id, title, entityStatus}}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistTC(id))
    }

    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleTC({todolistId: id, title: newTitle}))
    }
    return (
        <div className={s.container}>
            <h2 className={s.todolistTitle}>
                <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === "loading"} />
            </h2>
            <Button onClick={deleteTodolist} className={s.deleteTodolistButton} disabled={entityStatus === "loading"}>
                <Trash/>
            </Button>
        </div>
    )
}
