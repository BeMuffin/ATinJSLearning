import { waitForFullPageLoad } from '../../utils/browser/pageLoadWaiter';

export default abstract class Page {
  url = 'http://localhost:8080/ui/';
  fullUrl = '/';

  async open(url?: string) {
    return url ? await browser.url(url) : await browser.url(this.fullUrl);
  }

  openNewTab() {
    return browser.newWindow(this.fullUrl);
  }

  async waitForFullLoad(timeout?: number) {
    await waitForFullPageLoad(timeout);
  }

  async waitForUrlToContain(text: string ) {
    return !!(await browser.waitUntil(
      async () =>
          (await browser.getUrl()).indexOf(text) !== -1,
      {
        timeout: 30000,
        timeoutMsg: `Actual URL: ${await browser.getUrl()}. \nExpected URL: ${text}`,
      }
    ));
  }

  async setValueToInputField(selector:string, value: string) {
    await (await $(selector)).setValue(value);
  }

  async waitForElementAndClick(selector: string, timeout?: number) {
    await (await $(selector)).waitForClickable({ timeout: timeout || 30000 });
    await (await $(selector)).click();
  }

  async waitForSelectElementFromList(openListButtonSelector: string, listSelector: string, value: string) {
    this.waitForElementAndClick(openListButtonSelector);
    const elementsList = await $$(listSelector);
    const selectedLink = elementsList.find(async link => await link.getText() === value);
    selectedLink.waitForClickable({ timeout: 30000 });
    await (await $(listSelector)).waitForDisplayed({ timeout: 30000 });
    await (await $(listSelector)).selectByVisibleText(value);
  }

  async selectOptionByValue(dropDown: string, container: string, value: string) {
    await this.waitForElementAndClick(dropDown);
    await this.selectElementByValueFromContainer(container, value);
  }

  async selectElementByValueFromContainer(container: string, value: string) {
    const elementContainer = await $$(container);
    await browser.waitUntil(async () => (elementContainer).length > 0);
    await elementContainer.find(async elem => (await elem.getAttribute('innerText')) === value || (await elem.getText()) === value).click();

  }

  async waitForElementToBeDisplayed(selector: string, timeout?: number) {
    await (await $(selector)).waitForDisplayed({ timeout: timeout || 30000 });
  }

}
