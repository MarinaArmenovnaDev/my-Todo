import type {FilterValue, Task, Todolist} from "../../app/App.tsx";
import {type ChangeEvent, useState} from "react";
import Button from '@mui/material/Button'
import {CreateItemForm} from "../CreateItemForm/CreateItemForm.tsx";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

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
    const [_error, _setError] = useState<string | null>(null)

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
        <div>
            <div className={"container"}>
                <h2>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h2>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ?
                (<p>no tasks</p>) : (
                    <List>
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
                                <ListItem key={task.id}
                                          sx={getListItemSx(task.isDone)}>
                                    <div>
                                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    </div>
                                    <IconButton onClick={deleteTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            );
                        })}
                    </List>
                )
            }
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>

    )
}
