import {styled} from "@mui/material";
import Button from "@mui/material/Button";

export const NavButton = styled(Button)(({ theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    border: " 1px solid #fff",
    borderRadius: '5px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    backgroundColor: "transparent",
}))
