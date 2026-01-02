import {useReducer, useState} from 'react'
import './App.css'
import {v1} from "uuid";
import {TodolistItem} from "./components/TodolistItem/TodolistItem.tsx";
import {CreateItemForm} from "./components/CreateItemForm/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {containerSx} from "./components/TodolistItem/TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAc,
    changeTaskTitleAc,
    createTaskAC,
    deleteTaskAc,
    tasksReducer
} from "./model/tasks-reducer.ts";

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

type ThemeMode = 'dark' | 'light'

function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#a378ec',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const todolistId1 = v1()
    const todolistId2 = v1()


    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "Daily tasks", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'Закончить проект', isDone: false},
            {id: v1(), title: 'Купить продукты', isDone: true},
            {id: v1(), title: 'Позвонить маме', isDone: false},
            {id: v1(), title: 'Сходить на тренировку', isDone: true},
            {id: v1(), title: 'Прочитать книгу', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],

    })

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchTasks(createTaskAC({todolistId, title}))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTaskAc({todolistId, taskId}))
    }


    const changeFilter = (todolistId: string, filter: FilterValue) => {
        dispatchTodolists(changeTodolistFilterAC({todolistId, filter}))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAc({todolistId, taskId, isDone}))
    }
    const deleteTodolist = (todolistId: string) => {
        dispatchTodolists(deleteTodolistAC(todolistId))
    }


    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(changeTaskTitleAc({todolistId, taskId, title}))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC({todolistId, title}))
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton color="inherit">Sign in</NavButton>
                                <NavButton color="inherit">Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
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
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
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
