import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend } from 'recharts';
import Title from './Title';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
 
export default function BarChartGames() {
  const theme = useTheme();
  const [count, setCount] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  React.useEffect(() => {
    var apiurl = "http://3.84.121.75:8080/schedule/Games/";
    axios
      .get(apiurl)
      .then((response) => response.data)
      .then((data) => {
        const levels = data.data.map(o => o.level);
        var arr = [0,0,0];
        levels.forEach(element => {
            if(element == "low"){
                arr[0] += 1;
            }else if(element == "medium"){
                arr[1] +=1;
            }else{
                arr[2] +=1;
            }
        });
        setTableData([{
            name: 'Low',
            val: arr[0],
          },
          {
            name: 'Medium',
            val: arr[1],
          },
          {
            name: 'High',
            val: arr[2],
          }]);
        console.log(tableData);
        setIsLoaded(true);
      });
  }, []);
  return (
    <React.Fragment>
      <Title>Total Game Values To Date</Title>
      <ResponsiveContainer >
      {isLoaded ? <BarChart
          data={tableData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="name"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
            </Label>
          </YAxis>
          <Bar dataKey="val" fill="#8884d8" />
        </BarChart>:
        <CircularProgress/>}
      </ResponsiveContainer>
    </React.Fragment>
  );
}
