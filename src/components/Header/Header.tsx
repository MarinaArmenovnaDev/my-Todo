import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {containerSx} from "../TodolistItem/TodolistItem.styles.ts";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "../../NavButton.ts";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import type {ThemeMode} from "../../app/App.tsx";

type Props = {
    changeMode: () => void
    themeMode: ThemeMode
}

export const Header = ({changeMode, themeMode}: Props) => {

    return (
        <AppBar position="static" sx={{
            mb: '30px',
            background: 'linear-gradient(45deg,#5C5C5C 20%, #B9BDB9 90%)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
        }}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton color="inherit">Sign in</NavButton>
                        <NavButton color="inherit">Sign up</NavButton>
                        <NavButton color="inherit">Faq</NavButton>
                        <Switch color={'default'} onChange={changeMode} checked={themeMode === 'dark'}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
