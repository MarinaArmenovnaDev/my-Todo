import {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import {TodolistItem} from "./components/TodolistItem/TodolistItem.tsx";
import {CreateItemForm} from "./components/CreateItemForm/CreateItemForm.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValue = "All" | "Active" | "Completed"

export type Todolist = {
    id: string
    title: string
    filter: FilterValue
}
export type TasksState = {
    [key: string]: Task[]
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()


    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: "Daily tasks", filter: "All"},
        {id: todolistId2, title: "What to learn", filter: "All"},
    ])

    const [tasks, setTasks] = useState<TasksState>({
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

    const deleteTask = (todolistId: string, taskId: string) => {
        const res = {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)}
        setTasks(res)
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: string, filter: FilterValue) => {
        const res = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist)
        setTodolists(res)
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: string) => {
        const todolistId = v1()
        const newTodo: Todolist = {id: todolistId, title, filter: "All"}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title}: t)})
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    return (
        <div className={"app"}>
            <div>
                <CreateItemForm onCreateItem={createTodolist}/>
            </div>
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === "Active") {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === "Completed") {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }
                return (
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
                )
            })}

        </div>
    )
}

export default App
