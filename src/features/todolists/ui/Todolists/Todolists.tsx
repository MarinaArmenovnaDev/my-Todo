import Grid from "@mui/material/Grid";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks";
import {useEffect} from "react";
import {useAppDispatch} from "@/common/hooks";
import {fetchTodolistsTC, selectTodolists} from "@/features/todolists/model/todolists-slice.ts";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
       dispatch(fetchTodolistsTC())
    }, []);

    return (
        <>
            {todolists?.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <TodolistItem
                            key={todolist.id}
                            todolist={todolist}
                        />
                    </Grid>
                )
            })}
        </>
    )
}
