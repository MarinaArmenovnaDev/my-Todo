import s from "./FilterButtons.module.css";
import {Button} from "@/common/components/Button/Button.tsx";
import {
    changeTodolistFilterAC,
    type DomainTodolist,
    type FilterValue
} from "@/features/todolists/model/todolists-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: DomainTodolist
}

export const FilterButtons = ({todolist: {id, filter}}: Props) => {

    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValue) => {
        dispatch(changeTodolistFilterAC({todolistId: id, filter}))
    }
    return (
        <div className={s.filterButtonsContainer}>
            <Button className={`${s.filterButton} ${filter === 'all' ? s.active : ''}`}
                    onClick={() => changeFilter('all')}>
                All
            </Button>
            <Button className={`${s.filterButton} ${filter === 'active' ? s.active : ''}`}
                    onClick={() => changeFilter('active')}>
                Active
            </Button>
            <Button className={`${s.filterButton} ${filter === 'completed' ? s.active : ''}`}
                    onClick={() => changeFilter('completed')}>
                Completed
            </Button>
        </div>
    )
}
