import NoDataMessage from "../NoDataMessage";
import {useAppSelector} from "../../hooks/hooks";
import Loading from "../Loading";
import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import ReliantTable from "./ReliantTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Table() {
  const showTable = useAppSelector(s => s.table.showTable);
  const tableData = useAppSelector(s => s.table.items);
  const loading = useAppSelector(s => s.table.loading);
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!showTable) {
    return (
      <div>
        <NoDataMessage/>
      </div>
    )
  }

  if (loading) {
    return (
      <Loading/>
    )
  }

  if (Object.keys(tableData).length === 0) {
    return (
      <>
        <h2>Need to make a new table</h2>
      </>
    )
  }

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
          {Object.keys(tableData).map((key, index) => (
            <Tab
              key={`tab_${tableData[key].id}`}
              label={tableData[key].name}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {Object.keys(tableData).map((key, index) => (
        <CustomTabPanel key={`panel_${key}`} value={value} index={index}>
          <ReliantTable {...tableData[key]}/>
        </CustomTabPanel>
      ))}

    </Box>
  )
}


