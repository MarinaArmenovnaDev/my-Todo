import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import {Button} from "../Button/Button.tsx";

type Props ={
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle("")
        } else {
            setError("Title is required")
        }

    }

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createItemHandler()
        }
    }
    return (
        <>
            <input type="text" onChange={changeItemTitleHandler} value={title} onKeyDown={createItemOnEnterHandler}
                   className={error ? "error" : ""}/>
            <Button onClick={createItemHandler}>+</Button>
        </>
    )
}
