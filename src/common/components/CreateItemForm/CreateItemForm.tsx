import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import {CircleFadingPlus} from "lucide-react";
import {Button} from "@/common/components/Button/Button.tsx";
import s from "./CreateItemForm.module.css"

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
        <div className={s.container}>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={title}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            <Button onClick={createItemHandler} className={s.addButton}>
                <CircleFadingPlus />
            </Button>
        </div>
    )
}
