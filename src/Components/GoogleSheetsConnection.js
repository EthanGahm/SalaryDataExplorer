import React from "react";
import SheetsAPIInfo from "../SheetsAPIInfo.json";
import { GoogleSpreadsheet } from "google-spreadsheet";

const testSheet = new GoogleSpreadsheet(
  "1lGGq2KIfWu27Wr3sLWeDpNoEfCN8OR4FXTjI09k-uNY"
);

const dataSheet = (async function () {
  try {
    await testSheet.useServiceAccountAuth({
      client_email: SheetsAPIInfo.client_email,
      private_key: SheetsAPIInfo.private_key,
    });

    const dataSheet = await testSheet.loadInfo();
    return dataSheet;
  } catch (e) {
    console.error("Error: ", e);
  }
})();

export default dataSheet;
