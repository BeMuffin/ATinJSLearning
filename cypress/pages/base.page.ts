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

  resizeBrowser(width?, height?, preset?) {
    if (preset) {
      cy.viewport(preset);
    } else {
      cy.viewport(width, height);
    }
  }

  getBrowserResolution() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  isElementDisplayed(selector) {
    let isDisplayed;
    cy.get(selector).then((element) => {
      isDisplayed = Cypress.dom.isVisible(element);
    });
    return isDisplayed;
  }

  scrollToElement(element) {
    element.scrollIntoView();
  }

  isScrolledToElement(element) {
    cy.wrap(element).should('be.visible');
    cy.window().then((win) => {
      const { top, bottom } = element[0].getBoundingClientRect();
      const viewportHeight = win.innerHeight;
      if (
        top >= 0 &&
        top < viewportHeight &&
        bottom >= 0 &&
        bottom < viewportHeight
      ) {
        return true;
      }
      return false;
    });
  }
}
