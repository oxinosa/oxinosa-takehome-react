import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../hooks/hooks";

export default function ApplicationBar() {
  const userName = useAppSelector(s => s.user.username);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Reliant AI
          </Typography>
          <Button color='inherit'>{userName}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}