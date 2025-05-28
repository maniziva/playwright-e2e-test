import{test} from '@playwright/test';

test.describe('Test suite', ()=>{
    test('Handle table data-1', async({page})=>{
        await page.goto('https://practice.expandtesting.com/dynamic-table');
        const tableRow = await page.locator('table[class="table table-striped"] tbody tr');
        const rowCount = await tableRow.count();
        console.log(`Row count is: ${rowCount}`);

        const tableData : {Name: string, Network: string, Memory: string, CPU: string, Disk: string}[] = [];
        for(let i=1; i< rowCount; i++){
            const row = tableRow.nth(i);
            const name = await row.locator('td').nth(0).innerText();
            const network = await row.locator('td').nth(1).innerText();
            const memory = await row.locator('td').nth(2).innerText();
            const cpu = await row.locator('td').nth(3).innerText();
            const disk = await row.locator('td').nth(4).innerText();       
            tableData.push({
                Name: name,
                Network: network,
                Memory: memory,
                CPU: cpu,
                Disk: disk
            });
        }
        console.table(tableData);

        //filter table data
        const filteredData = tableData.filter(item => item.Name === 'System');
        //console.log(`Filtered Data: ${JSON.stringify(filteredData, null, 2)}`);

        console.log(`System name's Memory is: ${filteredData[0].Memory}`);

    });


test('Handle table data-2', async({page})=>{
    await page.goto('https://practice-automation.com/tables/');
    const tableRow = await page.locator('figure[class="wp-block-table"] table tr');
    const rowCount = await tableRow.count();
    console.log(`Row count is: ${rowCount}`);

    const tabledata : {Item: string, Price: string} [] =[];

    for(let i=1; i< rowCount; i++){
        const row =  tableRow.nth(i);
        const item = await row.locator('td').nth(0).innerText();
        const price = await row.locator('td').nth(1).innerText();

        tabledata.push ({
            Item: item, Price: price
        });
    }
    console.table(tabledata);
});

test('Handle web table -3', async({page}) =>{
    await page.goto('https://practice-automation.com/tables/');

    await page.locator('select[aria-controls="tablepress-1"]').selectOption('100');
    const tableRow = await page.locator('table[id="tablepress-1"] tr');
    const rowCount = await tableRow.count();
    console.log(`Row count is: ${rowCount}`);

    const tabledata : { Rank: number, Country: string, Population: string }[] = [];

    for(let i=1; i< rowCount; i++){
        const row = tableRow.nth(i);
        const rank = await row.locator('td').nth(0).innerText();
        const country = await row.locator('td').nth(1).innerText();
        const population = await row.locator('td').nth(2).innerText();

        tabledata.push({
            Rank: parseInt(rank, 10),
            Country: country,
            Population: population
        });
    }
    console.table(tabledata);

    // Extract Rank values
const ranks = tabledata.map(item => item.Rank);

// Check ascending order
const isAscending =  ([...ranks].sort((a, b) => a - b));
console.log(`Ascending: ${isAscending}`);
if (!isAscending) {
    throw new Error("Table is not sorted in ascending order by Rank");
}



// Click the sort button (assuming the down arrow sorts descending)
await page.locator('.dt-column-title').first().dblclick(); // Replace selector with actual sort button locator

// Re-fetch table data after sorting
const sortedTableData: { Rank: number, Country: string, Population: string }[] = [];

for (let i = 1; i < rowCount; i++) {
    const row = tableRow.nth(i);
    const rank = await row.locator('td').nth(0).innerText();
    const country = await row.locator('td').nth(1).innerText();
    const population = await row.locator('td').nth(2).innerText();

    sortedTableData.push({
        Rank: parseInt(rank, 10),
        Country: country,
        Population: population
    });
}
console.table(sortedTableData);
// Check descending order
const sortedRanks = sortedTableData.map(item => item.Rank);
const isDescending = ([...sortedRanks].sort((a, b) => b - a));
console.log(`Descending: ${isDescending}`);
if (!isDescending) {
    throw new Error("Table is not sorted in descending order by Rank");
}
})
});

