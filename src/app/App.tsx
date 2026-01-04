import './App.css'
import {TodolistItem} from "../components/TodolistItem/TodolistItem.tsx";
import {CreateItemForm} from "../components/CreateItemForm/CreateItemForm.tsx";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {createTheme, ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {Header} from "../components/Header/Header.tsx";
import {useState} from "react";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValue = "all" | "active" | "completed"

export type Todolist = {
    id: string
    title: string
    filter: FilterValue
}
export type TasksState = {
    [key: string]: Task[]
}

export type ThemeMode = 'dark' | 'light'


function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#808080',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()


    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))

    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }


    const changeFilter = (todolistId: string, filter: FilterValue) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({todolistId}))
    }


    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todolistId, title}))
    }


    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header changeMode={changeMode} themeMode={themeMode}/>
                <Container maxWidth={'lg'}>
                    <Grid container>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>

                    <Grid container spacing={4}>


                        {todolists?.map(todolist => {
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === "active") {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === "completed") {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }
                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}} >
                                        <TodolistItem
                                            key={todolist.id}
                                            tasks={filteredTasks}
                                            todolist={todolist}
                                            deleteTask={deleteTask}
                                            createTask={createTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            deleteTodolist={deleteTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}

                                        />
                                    </Paper>

                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    )
}

export default App
