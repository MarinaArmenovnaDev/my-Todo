import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/common/components";
import {useAppDispatch} from "@/common/hooks";
import {createTodolistTC} from "@/features/todolists/model/todolists-slice.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";

export const Main = () => {
    const dispatch = useAppDispatch()


    const createTodolist = (title: string) => {
        dispatch(createTodolistTC(title))

    }


    return (
        <Container maxWidth={'lg'}>
            <Grid container>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
