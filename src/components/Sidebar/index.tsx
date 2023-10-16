import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Drawer,
  Toolbar,
  Typography,
  ButtonGroup,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataSourceDetail from "./DataSourceDetail";
import Button from "@mui/material/Button";
import AddChatStream from "../AddChatStream";
import AddNewTable from "../AddNewTable";
import {fetchVersionedTablesById} from "../../store/actions/table.action";

const drawerWidth = 240;

export default function SideBar() {
  const chatStreams = useAppSelector(s => s.chatStreams.chatStreams);
  const dataSources:any = useAppSelector(s => s.dataSource);
  const chatStreamLoading = useAppSelector(s => s.chatStreams.loading);
  const dataSourcesLoading = useAppSelector(s => s.dataSource.loading);
  const dispatch = useAppDispatch();
  const onShowTableClickEvent = (chatStreamId: string) => {
    dispatch(fetchVersionedTablesById(chatStreamId))
  }

  if (chatStreamLoading || dataSourcesLoading) {
    return (
      <p>loading</p>
    )
  }

  console.log('datasources')
  console.log(dataSources)

  return (
    <>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Typography style={{ textAlign: 'center', padding: 2 }} variant="h6">
            ChatStreams
          </Typography>
          {chatStreams.map(chatStream => (
            <Accordion key={`chatStream_${chatStream.id}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{chatStream.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ButtonGroup orientation='vertical'>
                  <AddNewTable chatStreamId={chatStream.id} />
                  <Button onClick={() => onShowTableClickEvent(chatStream.id)} variant='contained'>Show Data</Button>
                </ButtonGroup>

              </AccordionDetails>
              <AccordionDetails>
                <Typography>Data Sources</Typography>
              </AccordionDetails>
              <AccordionDetails>
                {dataSources.items[chatStream.id].items.map((ds:any) => (
                  <DataSourceDetail key={`dataSourceDetail_${ds.id}`} {...ds} />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <AddChatStream />
        </div>
      </Drawer>
    </>
  )
}