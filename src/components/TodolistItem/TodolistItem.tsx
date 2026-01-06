import type {FilterValue, Task, Todolist} from "../../app/App.tsx";
import {type ChangeEvent} from "react";
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import DeleteIcon from '@mui/icons-material/Delete'
import s from "./TodolistItem.module.css"
import {X} from "lucide-react";
import {Button} from "../Button/Button.tsx";

type Props = {
    tasks: Task[];
    deleteTask: (todolistId: string, taskId: string) => void
    createTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterValue) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolist: Todolist
    deleteTodolist: (todolistId: string,) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = ({
                                 tasks,
                                 deleteTask,
                                 createTask,
                                 changeFilter,
                                 changeTaskStatus,
                                 todolist: {id, filter, title},
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {
    // const [_error, _setError] = useState<string | null>(null)

    const changeFilterHandler = (filter: FilterValue) => {
        changeFilter(id, filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }
    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div className={s.todolist}>
            <div className={s.container}>
                <h2 className={s.todolistTitle}>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h2>
                <Button onClick={deleteTodolistHandler} className={s.deleteTodolistButton}>
                    <X/>
                </Button>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ?
                (<p>no tasks</p>) : (
                    <ul className={s.taskList}>
                        {tasks.map((task: Task) => {
                            const deleteTaskHandler = () => {
                                deleteTask(id, task.id)
                            }
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeTaskStatus(id, task.id, e.currentTarget.checked)
                            }
                            const changeTaskTitleHandler = (title: string) => {
                                changeTaskTitle(id, task.id, title)
                            }

                            return (
                                <li key={task.id} className={`${s.listItem} ${task.isDone ? s.completed : ''}`}>
                                    <div className={s.taskContent}>
                                        <input
                                            type="checkbox"
                                            checked={task.isDone}
                                            onChange={changeTaskStatusHandler}
                                            className={s.taskCheckbox}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={changeTaskTitleHandler}
                                        />
                                    </div>
                                    <Button onClick={deleteTaskHandler}>
                                        <DeleteIcon/>
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>
                )
            }
            <div className={s.filterButtonsContainer}>
                <Button  className={`${s.filterButton} ${filter === 'all' ? s.active : ''}`}
                    onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button  className={`${s.filterButton} ${filter === 'active' ? s.active : ''}`}
                    onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button   className={`${s.filterButton} ${filter === 'completed' ? s.active : ''}`}
                    onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </div>
        </div>

    )
}
