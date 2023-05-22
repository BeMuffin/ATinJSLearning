import { Given, Then, When, DataTable} from '@cucumber/cucumber';
import pages from '../pages/page-factory';
import LoginPage from '../pages/login-page';
import DashBoardMenu from '../components/menu-component';
import SettingsPage from '../pages/settings-page';
import LaunchesPage from '../pages/launches-page';
import EditLaunchModal from '../pages/modals/edit-launch-modal-page';

const windowHandles = [];

Given(/^I open "([^"]+)" page$/, async function (pageName: string) {
    const page = pages[pageName];
    await page.open();
    windowHandles.push(await browser.getWindowHandle());
});

Then(/^I should be on "([^"]+)" page and page is fully loaded$/, async (page: string, ) => {
    await pages[page].waitForUrlToContain(pages[page].url);
    await pages[page].waitForFullLoad();
});

Then(/^I login with (default|admin) user$/, async (user: string) => {
    if (user === 'default') {
        await LoginPage.setValueToInputField(LoginPage['Login input field'],process.env.DEFAULT_USER_LOGIN);
        await LoginPage.setValueToInputField(LoginPage['Password input field'],process.env.DEFAULT_USER_PASSWORD);
    }
    await LoginPage.waitForElementAndClick(LoginPage['Login button']);
});

Then(/^I should be on "([^"]+)" page$/, async (page: string, ) => {
    await pages[page].waitForUrlToContain(pages[page].url);
});

When(/^I click on "([^"]+)" on "(.+)" ?(?:page|component|modal)$/,async (elem: string, page: string) => {
      await pages[page].waitForElementAndClick(pages[page][elem]);
    }
);

When(/^I change to "([^"]+)" project$/, async (project: string) => {
    await DashBoardMenu.waitForSelectElementFromList(DashBoardMenu['Project menu button'],DashBoardMenu['Project menu list'],project);
});

When(/^I select "([^"]+)" option from "([^"]+)" container of "([^"]+)" dropdown on "([^"]+)" page$/, async (option: string,container:string, dropdown: string, page: string) => {
    await pages[page].selectOptionByValue(pages[page][dropdown], pages[page][container], option);
});

When(/^I wait until demo launches are loaded$/, async () =>{
    await LaunchesPage.waitForElementToBeDisplayed(LaunchesPage['Launch row'])
})

When(/^I generate demo data$/, async () => {
    await DashBoardMenu.waitForElementAndClick(DashBoardMenu['Settings menu button']);
    await SettingsPage.waitForUrlToContain(SettingsPage.url);
    await SettingsPage.waitForElementAndClick(SettingsPage['Demo data tab']);
    await SettingsPage.waitForElementAndClick(SettingsPage['Demo data button']);
});

When(/^I wait for "([^"]+)" seconds$/, async (seconds: string) => {
    await browser.pause(parseInt(seconds)*1000);
});

When(/^I enter the following attributes on "([^"]+)" modal:$/, async (userData: DataTable) => {
    const attributes = userData.hashes();
    await EditLaunchModal.addNewAttributes(attributes)
})

