import LoginPage from '../pages/login.page';
import DashboardPage from '../pages/dashboard.page';
import { urls } from '../fixtures/urls';
import LaunchesPage from '../pages/launches.page';

describe('Launches', () => {
  beforeEach('Log In user', () => {
    LoginPage.open();
    LoginPage.logInUser(Cypress.env('username'), Cypress.env('password'));
  });

  it('Check that number of launches pages displayed on Launcher page', function () {
    DashboardPage.waitForOpenLaunchesPage();
    expect(cy.url()).contains(urls.launchesPage);
    LaunchesPage.scrollToPagesButtons();
    expect(LaunchesPage['Launches Page Buttons']).to.be.visible();
  });

  afterEach('Log Out user', () => {
    DashboardPage.waitForUserLogOut();
  });
});
