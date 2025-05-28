import{test} from '@playwright/test';

test.describe('Test suite', ()=>{
    test.only('Handle Dropdown data-1', async({page})=>{
        await page.goto('https://practice.expandtesting.com/dropdown');
        
        // Select the dropdown element
        const dropdown = page.locator('select#country');
        
        // Get all options in the dropdown
        const options = await dropdown.locator('option');
        const optionCount = await options.count();
        console.log(`Option count is: ${optionCount}`);
        
        const dropdownValue : { Option: number, Value: string, Text: string }[] = [];
        // Iterate through each option and log its value and text
        for (let i = 1; i < optionCount; i++) {
            const option = options.nth(i);
            const value = await option.getAttribute('value');
            const text = (await option.innerText()).trim();
            //console.log(`Option ${i + 1}: Value = ${value}, Text = ${text}`);

            dropdownValue.push({
                Option: i + 1,
                Value: value, 
                Text: text
            });
        }
        console.table(dropdownValue);

        // store to json file
        const fs = require('fs');
        fs.writeFileSync('test/interview-practice/may/dropdownData.json', JSON.stringify(dropdownValue, null, 2));

        //Read the JSON file
        const data = fs.readFileSync('test/interview-practice/may/dropdownData.json', 'utf8');
        const jsonData = JSON.parse(data);
        //console.log('JSON Data:', jsonData);

        // select particular data from json and selet option from dropdown
        const optionToSelect = jsonData.find(item => item.Text === 'United States');
            await dropdown.selectOption({ value: optionToSelect.Value });
            // Verify the selected option
            const selectedValue = await dropdown.inputValue();
            console.log(`Selected value is: ${selectedValue}`);

        //How to select random option from dropdown
        const randomIndex = Math.floor(Math.random() * optionCount); // Includes all options
        // Select an option by value
        await dropdown.selectOption({ index: randomIndex });
        
        // // Verify the selected option
         const selectedValue1 = await dropdown.inputValue();
         console.log(`Selected value is: ${selectedValue1}`);
    });
});