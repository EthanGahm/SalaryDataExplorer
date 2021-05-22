import SheetsAPIInfo from "../SheetsAPIInfo.json";

const testSheet = new GoogleSpreadsheet(
  "1lGGq2KIfWu27Wr3sLWeDpNoEfCN8OR4FXTjI09k-uNY"
);

testSheet = (async function () {
  try {
    await testSheet.useServiceAccountAuth({
      client_email: SheetsAPIInfo.client_email,
      private_key: SheetsAPIInfo.private_key,
    });

    await testSheet.loadInfo();
  } catch (e) {
    console.error("Error: ", e);
  }
  return testSheet;
})();

console.log(testSheet.title);
