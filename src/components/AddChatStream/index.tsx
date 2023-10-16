import {
  Box,
  Fab,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select, SelectChangeEvent,
  TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../hooks/hooks";
import {NewDataSource} from "../../store/interfaces/datasource.interface";
import {createNewDataSource} from "../../store/actions/datasource.action";


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

const textFieldStyle = {
  width: 325,
  marginBottom: 15
}



export default function AddChatStream() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [dataSourceType, setDataSourceType] = useState<"API" | "Database" | "CSV" | "Excel" | "XML" | "PDF" | "JSON" | "File">('API');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDataSourceTypeChange = (e: SelectChangeEvent) => {
    // @ts-ignore
    setDataSourceType(e.target.value);
  }

  const handleCreateSubmit = (e: any) => {
    e.preventDefault();
    const data: NewDataSource = {
      type: dataSourceType,
      name: e.target.dataSourceName.value,
      uri: e.target.dataSourceUri.value,
      description: e.target.dataSourceDescription.value
    }
    const chatStreamName = e.target.chatStreamName.value;
    dispatch(createNewDataSource({ newDataSourceData: data, chatStreamName }));
    handleClose();
  }

  return (
    <>
      <Fab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon/>
      </Fab>
      <Modal
        open={open}
      >
        <Box sx={style}>
          <form onSubmit={handleCreateSubmit}>
            <FormLabel style={{marginBottom: 15}} component="legend">Create new ChatStream</FormLabel>
            <FormGroup aria-label="position" row={false}>
              <TextField
                required
                style={textFieldStyle}
                id="chatStreamName"
                name="chatStreamName"
                label="ChatStream Name"
                variant="outlined"
              />
              <TextField
                required
                style={textFieldStyle}
                id="dataSourceName"
                name="dataSourceName"
                label="DataSource Name"
                variant="outlined"
              />
              <TextField
                required
                style={textFieldStyle}
                id="dataSourceDescription"
                name="dataSourceDescription"
                label="DataSource Desciption"
                variant="outlined"
              />
              <TextField
                required
                style={textFieldStyle}
                id="dataSourceUri"
                name="dataSourceUri"
                label="DataSource URI"
                variant="outlined"
              />
              <FormControl style={{ width: 325 }}>
                <InputLabel id="dataSourceType">DataSource Type</InputLabel>
                <Select
                  labelId="dataSourceType"
                  id="demo-simple-select"
                  value={dataSourceType}
                  label="DataSource Type"
                  onChange={handleDataSourceTypeChange}
                >
                  <MenuItem value="API">API</MenuItem>
                  <MenuItem value="Database">Database</MenuItem>
                  <MenuItem value="CSV">CSV</MenuItem>
                  <MenuItem value="Excel">Excel</MenuItem>
                  <MenuItem value="XML">XML</MenuItem>
                  <MenuItem value="PDF">PDF</MenuItem>
                  <MenuItem value="JSON">JSON</MenuItem>
                  <MenuItem value="File">File</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', marginTop: 2 }}>
                <Button onClick={handleClose}>Close</Button>
                <Button variant="outlined" type='submit'>Create</Button>
              </Box>
            </FormGroup>
          </form>
        </Box>
      </Modal>
    </>
  )
}