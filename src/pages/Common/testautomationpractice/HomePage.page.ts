import { Locator, Page, test } from '@playwright/test';

export class HomePage{
    readonly page: Page;
    readonly name: Locator;
    readonly gender: Locator;
    readonly days: Locator;
    readonly country: Locator;
    //dropdown: Locator;


    constructor(page: Page){
        this.page = page;
        this.name = page.locator('#name')
        this.gender = page.locator('#male')
        this.days = page.locator('#sunday')
        this.country = page.locator('#country')
    }

    async getDropdownValues(locator: string) {
        const dropdown = this.page.locator(locator);
        const values = await dropdown.evaluate((select) => {
            return [...(select as HTMLSelectElement).options].map((option) => option.value);
        });
        return values;
    }
}

export class Dashboard extends HomePage {
    constructor(page: Page) {
        super(page); // Call the parent class constructor
    }

    async fillName(name: string){
        await this.name.fill(name);
    }
}

