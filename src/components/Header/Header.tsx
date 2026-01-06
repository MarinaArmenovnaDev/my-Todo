import MenuIcon from "@mui/icons-material/Menu";
import s from "./Header.module.css"
import {Button} from "../Button/Button.tsx";


export const Header = () => {

    return (
        <div className={s.header}>
            <div className={s.burgerMenuIcon}>
                <MenuIcon/>
            </div>
            <div className={s.navButtonContainer}>
                <Button>Sign in</Button>
                <Button>Sign up</Button>
                <Button>Faq</Button>
            </div>

        </div>
    )
}
