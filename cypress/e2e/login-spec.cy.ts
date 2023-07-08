import LoginPage from '../pages/login.page';
import { urls } from '../fixtures/urls';
import { invalidUserCredentials } from '../fixtures/user-constants';

describe('Login', () => {
  it('Log in user successfully', () => {
    LoginPage.open();
    LoginPage.logInUser(Cypress.env('username'), Cypress.env('password'));
    cy.url().should('include', urls.dashboardPage);
  });

  it('Log in user with invalid credentials', () => {
    LoginPage.open();
    LoginPage.logInUser(
      invalidUserCredentials.userName,
      invalidUserCredentials.password
    );
    cy.url().should('include', urls.loginPage);
    expect(LoginPage.waitForBadCredentialsNotificationDisplay()).to.equal(true);
  });
});
