import s from "./FilterButtons.module.css";
import {Button} from "@/common/components/Button/Button.tsx";
import type {FilterValue, Todolist} from "@/app/App.tsx";
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist
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
