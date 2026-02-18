import MenuIcon from "@mui/icons-material/Menu";
import s from "./Header.module.css"
import {Button} from "@/common/components/Button/Button.tsx";
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "@/common/hooks";
import {selectStatus} from "@/app/app-slice.ts";



export const Header = () => {

    const status = useAppSelector(selectStatus)

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
            {
                status === 'loading' && (
                    <div style={{
                        position: 'absolute',
                        bottom: '-3px',
                        left: 0,
                        right: 0,
                        width: '100%'
                    }}>
                        <LinearProgress />
                    </div>
                )
            }
        </div>
    )
}
