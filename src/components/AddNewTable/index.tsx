import {
  Box, FormGroup, FormLabel,
  Modal, TextField
} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../hooks/hooks";
import {createNewTable} from "../../store/actions/table.action";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  chatStreamId: string
}

export default function AddNewTable({chatStreamId}: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createNewTable({
      chatStreamId: chatStreamId,
      tableName: e.target.tableName.value
    }))
  }

  return (
    <>
      <Button onClick={handleOpen} variant='outlined'>Create Table</Button>
      <Modal
        open={open}
      >
        <Box sx={style}>

          <form onSubmit={handleSubmit}>
            <FormLabel style={{marginBottom: 15}} component="legend">Create new Table</FormLabel>
            <FormGroup aria-label="position" row={false}>
              <TextField required label="Table Name" name="tableName" />
              <Box sx={{ display: 'flex', marginTop: 2 }}>
                <Button variant="text" onClick={handleClose}>Close</Button>
                <Button variant="outlined" type='submit'>Create</Button>
              </Box>
            </FormGroup>
          </form>
        </Box>
      </Modal>
    </>
  )
}