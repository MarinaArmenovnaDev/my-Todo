import s from "./TodolistTitle.module.css";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {Button} from "@/common/components/Button/Button.tsx";
import {Trash} from "lucide-react";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import type {Todolist} from "@/app/App.tsx";

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist: {id, title}}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({todolistId: id}))
    }

    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({todolistId: id, title:newTitle}))
    }
    return (
        <div className={s.container}>
            <h2 className={s.todolistTitle}>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h2>
            <Button onClick={deleteTodolist} className={s.deleteTodolistButton}>
                <Trash />
            </Button>
        </div>
    )
}
