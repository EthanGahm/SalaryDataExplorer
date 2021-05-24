import SheetsAPIInfo from "../SheetsAPIInfo.json";
import { GoogleSpreadsheet } from "google-spreadsheet";

function connectSheet(sheet) {
  try {
    await sheet.useServiceAccountAuth({
      client_email: SheetsAPIInfo.client_email,
      private_key: SheetsAPIInfo.private_key,
    });

    await sheet.loadInfo();
  } catch (e) {
    console.error("Error: ", e);
  }
}
