import Grid from "@mui/material/Grid";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

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
