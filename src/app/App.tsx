import './App.css'
import {Header} from "@/common/components/Header/Header.tsx";
import {Main} from "@/app/Main.tsx";

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

function App() {
    return (
        <div className="app">
            <Header/>
            <Main/>
        </div>
    )
}

export default App
