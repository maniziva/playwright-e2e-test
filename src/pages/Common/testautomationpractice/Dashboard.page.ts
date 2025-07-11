import { Locator, Page, test } from '@playwright/test';
import { Dashboard } from './HomePage.page';

export class Dashboard2 extends Dashboard {
    constructor(page: Page) {
        super(page); // Call the parent class constructor
    }

    async fillName(name: string){
        await this.name.fill(name);
    }
}