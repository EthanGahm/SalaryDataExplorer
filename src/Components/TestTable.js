import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import SheetsAPIInfo from "../SheetsAPIInfo.json";
import { GoogleSpreadsheet } from "google-spreadsheet";

const columns = [
  { field: "Col1", headerName: "Column 1", width: 130 },
  { field: "Col2", headerName: "Column 2", width: 130 },
];

let rows = [];

const spreadSheet = new GoogleSpreadsheet(
  "1lGGq2KIfWu27Wr3sLWeDpNoEfCN8OR4FXTjI09k-uNY"
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
    <div style={{ height: 400, width: "100%" }}>
      {isLoaded ? (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(rows) => rows.Col1}
          autoHeight={true}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
