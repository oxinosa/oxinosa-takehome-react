import {useState} from "react";
import Button from "@mui/material/Button";
import {Column, ColumnType, Table as TableData, TableItem} from '../../store/interfaces/table.interface'
import {
  Avatar,
  Box,
  Chip, CircularProgress, FormControl,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText, MenuItem,
  Modal, Select, SelectChangeEvent, TextField,
  Typography
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addColumnInVersionedTable, deleteColumnInVersionedTable} from "../../store/actions/table.action";

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

const ColumnListItem = (props: {
  column: Column,
  handleDeleteColumn: () => void
}) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <Chip label={props.column.dataType}/>
          <IconButton size="small" onClick={props.handleDeleteColumn} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ width: 30, height: 30 }}>
          <FolderIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.column.title}
      />
    </ListItem>
  )
}

export default function EditTableStructure(props: TableItem) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openNewColumn, setOpenNewColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState<ColumnType>("string")
  const editing = useAppSelector(s => s.table.editing);
  const handleOpenNewColumn = () => setOpenNewColumn(true);
  const handleCloseNewColumn = () => {
    setNewColumnName("");
    setNewColumnType("string");
    setOpenNewColumn(false);
  }

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumnInVersionedTable({ columnId: id, tableData: props }));
  }

  const handleSaveNewColumn = (e: any) => {
    e.preventDefault();
    dispatch(addColumnInVersionedTable({
      title: newColumnName,
      type: newColumnType,
      tableData: props
    }));
    handleCloseNewColumn();
  }

  const handleTypeChange = (e: SelectChangeEvent) => {
    // @ts-ignore
    setNewColumnType(e.target.value)
  }

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Edit Table Structure
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h5">
            Edit Table Structure
          </Typography>
          <hr/>
          {
            editing ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <List>
                  {
                    props.table_structure.columns.length === 0 && (
                      <Box>
                        <Typography>

                        </Typography>
                      </Box>
                    )
                  }
                  {
                    props.table_structure.columns.map(column => (
                      <ColumnListItem
                        key={`column_item_${column.id}`}
                        column={column}
                        handleDeleteColumn={() => handleDeleteColumn(column.id)}
                      />
                    ))
                  }
                </List>
                {
                  openNewColumn ? (
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                      <form onSubmit={handleSaveNewColumn}>
                        <Box sx={{display: 'flex'}}>
                          <TextField
                            required
                            onChange={e => setNewColumnName(e.target.value)}
                            value={newColumnName}
                            name="columnName"
                            size="small"
                            label="Name"
                          />
                          <FormControl size="small">
                            <Select value={newColumnType} onChange={handleTypeChange}>
                              <MenuItem value="string">string</MenuItem>
                              <MenuItem value="number">number</MenuItem>
                              <MenuItem value="boolean">boolean</MenuItem>
                              <MenuItem value="date">date</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{paddingTop: 1}}>
                          <Button onClick={handleCloseNewColumn}>
                            Close
                          </Button>
                          <Button type="submit" variant="contained">
                            Save
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  ) : (
                    <Button onClick={handleOpenNewColumn} variant="contained">
                      Add new column
                    </Button>
                  )
                }
              </>
            )
          }

        </Box>
      </Modal>
    </>
  )
}