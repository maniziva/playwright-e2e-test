import { expect, request, test } from "playwright/test";

test.describe("Jan7 Test suite", async () => {
  const baseURL = "https://practicetestautomation.com/practice-test-table/";

  test.beforeEach("Before", async ({ page }) => {
    await page.goto(baseURL);
  });

test('Dropdown', async({page})=>{
  const dropdown = await page.locator('select[id=sortBy]')
  const values = await dropdown.evaluate((select) => {
    return [...(select as HTMLSelectElement).options].map(option => option.text);
  });
  console.log(values);

  await dropdown.selectOption({value:'col_course'});
    const selectedValues = await dropdown.evaluate((select) => {
    return [...(select as HTMLSelectElement).selectedOptions].map(option => option.text);
  });
  console.log(selectedValues);
});

test('API', async({page, request})=>{
  
});

test('Download-Upload', async({page})=>{
  
});

test('Alert', async({page})=>{
  
});

test('Scroll', async({page})=>{
  
});

test('Get Tabledata', async({page})=>{

  const dropdown = await page.locator('select[id=sortBy]')
  await dropdown.selectOption({value:'col_enroll'});

  const table = await page.locator('table[id="courses_table"] tr');
  const count = await table.count();
  console.log(count);

  const tableData: {ID: string, CourseName: string, Language: string, Level: string, Enrollment: number, Link: string}[] = [];
  for(let i=1; i<count; i++){
    const tableRow = await table.nth(i);
    const id = await tableRow.locator('td').nth(0).innerText();
    const name = await tableRow.locator('td').nth(1).innerText();
    const language = await tableRow.locator('td').nth(2).innerText();
    const level = await tableRow.locator('td').nth(3).innerText();
    const enroll = parseInt(await tableRow.locator('td').nth(4).innerText());
    const link = await tableRow.locator('td a').getAttribute('href')

    tableData.push({
      ID: id,
      CourseName: name,
      Language: language,
      Level: level,
      Enrollment: enroll,
      Link: link
    });
  }
  console.table(tableData);

  const filter = tableData.map(enroll => enroll.Enrollment);
  const sort = filter.sort((a,b) => a-b)
  expect(filter).toEqual(sort);
});

test('Get ecom data', async({page})=>{
  
});
});