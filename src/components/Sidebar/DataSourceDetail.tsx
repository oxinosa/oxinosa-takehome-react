import {Card, CardContent, Typography} from "@mui/material";
import {DataSource} from "../../store/interfaces/datasource.interface";

export default function DataSourceDetail(props: DataSource) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography>
            Name: {props.name}
          </Typography>
          <Typography>
            Type: {props.type}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}