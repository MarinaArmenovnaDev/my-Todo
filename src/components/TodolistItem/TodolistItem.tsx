import type {FilterValue, Task, Todolist} from "../../App.tsx";
import {type ChangeEvent, useState} from "react";
import {Button} from "../Button/Button.tsx";
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";

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
    const [error, setError] = useState<string | null>(null)

    const changeFilterHandler = (filter: FilterValue) => {
        changeFilter(id, filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }
    const createTaskHandler = () => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <div className={"container"}>
                <h2>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h2>
                <Button onClick={deleteTodolistHandler}>x</Button>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {error && <div className={"error-message"}>{error}</div>}
            {tasks.length === 0 ?
                (<p>no tasks</p>) : (
                    <ul>
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
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}
                                           className={task.isDone ? "is-done" : ""}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    <Button onClick={deleteTaskHandler}>x</Button>
                                </li>
                            );
                        })}
                    </ul>
                )
            }
            <Button onClick={() => changeFilterHandler("All")}
                    className={filter === "All" ? "active-filter" : ""}>All</Button>
            <Button onClick={() => changeFilterHandler("Active")}
                    className={filter === "Active" ? "active-filter" : ""}>Active</Button>
            <Button onClick={() => changeFilterHandler("Completed")}
                    className={filter === "Completed" ? "active-filter" : ""}>Completed</Button>
        </div>
    )
}
