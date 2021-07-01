import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import SheetsAPIInfo from "../SheetsAPIInfo.json";
import { GoogleSpreadsheet } from "google-spreadsheet";
// This file extracts the raw dataset for the 2021 survey responses

//creating columns to format the headers for the component
const columns = [
  { field: "Age", headerName: "Age", width: 130 },
  { field: "Industry", headerName: "Industry", width: 130 },
  { field: "Job Title", headerName: "Job Title", width: 130 },
  { field: "Annual Salary", headerName: "Annual Salary", width: 130 },
  { field: "Currency", headerName: "Currency", width: 130 },
  { field: "Location", headerName: "Location", width: 130 },
  { field: "Work Experience", headerName: "Work Experience", width: 130 },
  { field: "Context for Job", headerName: "Context for Job", width: 130 },
  { field: "Other", headerName: "Other", width: 130 },
];

// linking the Google Spreadsheet using the an identifier
const spreadSheet = new GoogleSpreadsheet(
  "13vhiAvwNpCaUAAutNwd-pEbYZNk1qIVMqgB4e4HGQtE"
);

export default function TestTable() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  // useEffect to load and render the google spreadsheet
  React.useEffect(() => {
    (async function () {
      try {
        await spreadSheet.useServiceAccountAuth({
          client_email: SheetsAPIInfo.client_email,
          private_key: SheetsAPIInfo.private_key,
        });

        await spreadSheet.loadInfo();
        const sheet = spreadSheet.sheetsByIndex[0];
        let tempRows = await sheet.getRows();
        setRows(tempRows);
        setIsLoaded(true);
      } catch (e) {
        console.error("Error: ", e);
      }
    })();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      {isLoaded ? (
        // this is the data grid where the spreadsheet data will be located
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(rows) => rows.rowNumber}
          autoHeight={true}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
