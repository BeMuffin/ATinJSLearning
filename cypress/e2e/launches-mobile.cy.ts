import LoginPage from '../pages/login.page';
import DashboardPage from '../pages/dashboard.page';
import { urls } from '../fixtures/urls';
import BasePage from '../pages/base.page';

describe('Launches', () => {
  before('Resize browser', () => {
    const basePage = new BasePage();
    basePage.resizeBrowser('iphone-se2');
  });
  beforeEach('Log In user', () => {
    LoginPage.open();
    LoginPage.logInUser(Cypress.env('username'), Cypress.env('password'));
  });

  afterEach('Log Out user', () => {
    DashboardPage.waitForUserLogOut();
  });
  it('Check browser items after resizing', function () {
    DashboardPage.waitForOpenLaunchesPage();
    cy.url().should('include', urls.launchesPage);
  });
});
