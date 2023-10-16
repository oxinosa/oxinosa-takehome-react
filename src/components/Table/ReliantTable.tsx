import {
  Box, Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';
import {Table as TableData, TableItem} from '../../store/interfaces/table.interface'
import EditTableStructure from "./EditTableStructure";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}))

export default function ReliantTable(props: TableItem) {
  return (
    <>
      <StyledBox>
        <Typography>
          {props.name}
        </Typography>
        <EditTableStructure {...props} />
      </StyledBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              {
                props.table_structure.columns.map(column => (
                  <StyledTableCell key={`column_${column.id}`}>
                    {column.title} <Chip size="small" label={column.dataType} />
                  </StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <Box sx={{ minHeight: 400 }}>
            </Box>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}