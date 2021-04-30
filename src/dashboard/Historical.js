import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { field: 'home', headerName: 'Home', width: 130 },
  { field: 'away', headerName: 'Away', width: 130 },
  {
    field: 'spread',
    headerName: 'Spread',
    type: 'number',
    width: 100,
  },
  {
    field: 'value',
    headerName: 'Value',
    type: 'number',
    width: 90,
  },
  {
    field: 'neutral',
    headerName: 'Neutral',
    type: 'number',
    width: 100,
  },
  {
    field: 'difference',
    headerName: 'Difference',
    type: 'number',
    width: 105,
  },
  {
    field: 'pick',
    headerName: 'Pick',
    width: 90,
  },
  {
    field: 'level',
    headerName: 'Level',
    width: 130,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 200,
  }
];

export default function Historical() {
  const [rowData, setRowData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    var apiurl = "http://3.84.121.75:8080/schedule/Games/";
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        setIsLoaded(true);
        setRowData(data.data);
        console.log("rows" + rowData);
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoaded ? <DataGrid rows={rowData} columns={columns} getRowId ={(rowData) => rowData.home} autoHeight={true} /> :
      <CircularProgress />}
      
    </div>
  );
}