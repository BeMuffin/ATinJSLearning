import { Given, When, Then, After, IWorld,  DataTable } from '@cucumber/cucumber';
import pages from '../pages/page-factory';

const windowHandles = [];

Given(/^I open "([^"]+)" page$/, async function (pageName: string) {
    const world: IWorld = this;
    const page = pages[pageName];
    await page.open();
    windowHandles.push(await browser.getWindowHandle());
});

Then(/^I should be on "([^"]+)" page and page is fully loaded$/, async (page: string) => {
    await pages[page].waitForUrlToContain(pages[page].url);
    await pages[page].waitForFullLoad();
  });
