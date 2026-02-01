import s from "./TodolistTitle.module.css";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {Button} from "@/common/components/Button/Button.tsx";
import {Trash} from "lucide-react";
import {
    changeTodolistTitleTC,
    deleteTodolistTC,
    type DomainTodolist
} from "@/features/todolists/model/todolists-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist: {id, title}}: Props) => {

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
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h2>
            <Button onClick={deleteTodolist} className={s.deleteTodolistButton}>
                <Trash/>
            </Button>
        </div>
    )
}
