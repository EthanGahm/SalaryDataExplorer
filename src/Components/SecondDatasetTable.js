import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import SheetsAPIInfo from "../SheetsAPIInfo.json";
import { GoogleSpreadsheet } from "google-spreadsheet";

const columns = [
  { field: "Age", headerName: "Age", width: 130 },
  { field: "Industry", headerName: "Industry", width: 130 },
  { field: "Job Title", headerName: "Job Title", width: 130 },
  { field: "Annual Salary", headerName: "Annual Salary", width: 130 },
  { field: "Currency", headerName: "Currency", width: 130 },
  { field: "Work Experience", headerName: "Work Experience", width: 130 },
  { field: "Context for Job", headerName: "Context for Job", width: 130 },
  { field: "Other", headerName: "Other", width: 130 },
  { field: "Other Compensation", headerName: "Other Compensation", width: 130 },
  { field: "Context", headerName: "Context", width: 130 },
  { field: "Country", headerName: "Country", width: 130 },
  { field: "State", headerName: "State", width: 130 },
  { field: "City", headerName: "City", width: 130 },
  {
    field: "Highest Level of Education",
    headerName: "Highest Level of Education",
    width: 130,
  },
  { field: "Gender", headerName: "Gender", width: 130 },
  { field: "Race", headerName: "Race", width: 130 },
];

const spreadSheet = new GoogleSpreadsheet(
  "1xL-FWa7vdAH32MtPPVX688IMmG2y2rE34A_VW7SoZnI"
);

export default function TestTable() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [rows, setRows] = React.useState([]);

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
