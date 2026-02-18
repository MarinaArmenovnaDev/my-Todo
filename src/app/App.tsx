import './App.css'
import {Header} from "@/common/components/Header/Header.tsx";
import {Main} from "@/app/Main.tsx";
import {ErrorSnackbar} from "@/common/components";


function App() {
    return (
        <div className="app">
            <Header/>
            <Main/>
            <ErrorSnackbar/>
        </div>
    )
}

export default App
