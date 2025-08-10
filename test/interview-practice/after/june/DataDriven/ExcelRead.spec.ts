import { test, expect } from "@playwright/test";
import * as XLSX from "xlsx";

test.describe("Read and Write data from external file", () => {
  test("Excel Read and Write", async ({ page }) => {

    const workbook = XLSX.readFile("src/data/DataDriven/UserData.xlsx");
    const worksheet = workbook.Sheets["Contacts"];
    const excelData: any[] = XLSX.utils.sheet_to_json(worksheet);

    await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
    await page.locator("#email").fill(excelData[1].username);
    await page.locator("#password").fill(excelData[1].password);
    await page.locator("#submit").click();
    await expect(page.locator("header h1")).toBeVisible({ timeout: 5000 });

    const table = page.locator("table#myTable");
    await expect(table).toBeVisible({ timeout: 10000 });

    const tableRow = await table.locator("tr");
    const RowCount = await tableRow.count();

    const tableData: { Name: string; BirthDate: string }[] = [];
    for (let i = 1; i < RowCount; i++) {
      const row = tableRow.nth(i);
      const name = await row.locator("td").nth(1).innerText();
      const birthdate = await row.locator("td").nth(2).innerText();

      tableData.push({
        Name: name,
        BirthDate: birthdate,
      });
    }
    console.table(tableData);

  // Write data to Excel
  const worksheet1 = XLSX.utils.json_to_sheet(tableData);
  const workbook1 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook1, worksheet1, 'Contacts');
  XLSX.writeFile(workbook1, 'src/data/DataDriven/tableData.xlsx');  
});
});
