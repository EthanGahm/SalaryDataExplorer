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
  { field: "Location", headerName: "Location", width: 130 },
  { field: "Work Experience", headerName: "Work Experience", width: 130 },
  { field: "Context for Job", headerName: "Context for Job", width: 130 },
  { field: "Other", headerName: "Other", width: 130 },

];

let rows = [];

const spreadSheet = new GoogleSpreadsheet(
  "13vhiAvwNpCaUAAutNwd-pEbYZNk1qIVMqgB4e4HGQtE"
);

let isLoaded = false;

(async function () {
  try {
    await spreadSheet.useServiceAccountAuth({
      client_email: SheetsAPIInfo.client_email,
      private_key: SheetsAPIInfo.private_key,
    });

    await spreadSheet.loadInfo();
    const sheet = spreadSheet.sheetsByIndex[0];
    rows = await sheet.getRows();
    isLoaded = true;
  } catch (e) {
    console.error("Error: ", e);
  }
})();

export default function TestTable() {
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
