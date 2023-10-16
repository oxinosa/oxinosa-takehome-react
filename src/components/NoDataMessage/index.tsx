import {Box, Typography} from "@mui/material";

export default function NoDataMessage() {
  return (
    <Box>
      <Typography variant='h1'>Reliant AI </Typography>
      <Typography variant='h3'>Select a chat stream from the bar on the right to see the data</Typography>
      <Typography variant='h6'>Create a new chat stream from the button on the bottom right</Typography>
    </Box>
  )
}