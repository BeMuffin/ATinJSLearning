import { urls } from '../fixtures/urls';

export default class BasePage {
  open(url?: string) {
    cy.visit(`${urls.base}${url}`);
  }

  waitForElementDisplay(selector, timeout?) {
    return cy.get(selector, { timeout: timeout || 10000 }).should('be.visible')
      ? true
      : false;
  }

  waitForElementAndClick(selector, timeout?) {
    cy.get(selector, { timeout: timeout || 10000 }).click();
  }

  waitForDropDownElementAndClick(
    dropDownSelector,
    dropDownElementSelector,
    timeout?
  ) {
    cy.get(dropDownSelector, { timeout: timeout || 10000 })
      .then((element) => element.click())
      .then(() => {
        cy.get(dropDownElementSelector, { timeout: timeout || 10000 }).then(
          (element) => element.click()
        );
      });
  }

  resizeBrowser(width?, height?, preset?){
    if(preset){
      cy.viewport(preset)
    }
    else{
      cy.viewport(width, height);
    }
  }

  getBrowserResolution(){
    return {width: window.innerWidth, height: window.innerHeight}
  }

  isElementDisplayed(selector){
    let isDisplayed;
    cy.get(selector).then((element) => {
      isDisplayed = Cypress.dom.isVisible(element)
    })
    return isDisplayed;
  }

  scrollToElement(element){
    element.scrollIntoView()
  }

  isScrolledToElement(element){
    cy.wrap(element).should('be.visible');
    cy.window().then((win) => {
      const { top, bottom } = element[0].getBoundingClientRect();
      const viewportHeight = win.innerHeight;
      if(top>=0 && top<viewportHeight && bottom>=0 && bottom<viewportHeight){
        return true;
      }
      return false
    });
  }
  //   openNewTab() {
  //     return browser.newWindow(this.fullUrl);
  //   }

  //   async waitForFullLoad(timeout?: number) {
  //     await waitForFullPageLoad(timeout);
  //   }

  //   async waitForUrlToContain(text: string ) {
  //     return !!(await browser.waitUntil(
  //       async () =>
  //           (await browser.getUrl()).indexOf(text) !== -1,
  //       {
  //         timeout: 30000,
  //         timeoutMsg: `Actual URL: ${await browser.getUrl()}. \nExpected URL: ${text}`,
  //       }
  //     ));
  //   }

  //   async setValueToInputField(selector:string, value: string) {
  //     await (await $(selector)).setValue(value);
  //   }

  //   async waitForElementAndClick(selector: string, timeout?: number) {
  //     await (await $(selector)).waitForClickable({ timeout: timeout || 30000 });
  //     await (await $(selector)).click();
  //   }

  //   async waitForSelectElementFromList(openListButtonSelector: string, listSelector: string, value: string) {
  //     await this.waitForElementAndClick(openListButtonSelector);
  //     const elementsList = await $$(listSelector);
  //     const selectedLink = elementsList.find(async link => await link.getText() === value);
  //     selectedLink.waitForClickable({ timeout: 30000 });
  //     await (await $(listSelector)).waitForDisplayed({ timeout: 30000 });
  //     await (await $(listSelector)).selectByVisibleText(value);
  //   }

  //   async selectOptionByValue(dropDown: string, container: string, value: string) {
  //     await this.waitForElementAndClick(dropDown);
  //     await this.selectElementByValueFromContainer(container, value);
  //   }

  //   async selectElementByValueFromContainer(container: string, value: string) {
  //     const elementContainer = await $$(container);
  //     await browser.waitUntil(async () => (elementContainer).length > 0);
  //     await elementContainer.find(async elem => (await elem.getAttribute('innerText')) === value || (await elem.getText()) === value).click();

  //   }

  //   async waitForElementToBeDisplayed(selector: string, timeout?: number) {
  //     await (await $(selector)).waitForDisplayed({ timeout: timeout || 30000 });
  //   }
}
