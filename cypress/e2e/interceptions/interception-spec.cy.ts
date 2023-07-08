import LoginPage from '../../pages/login.page';
import { urls } from '../../fixtures/urls';

describe('Launches', () => {
  let response;

  it('Intercept Browser requests and verify a response to browser', function () {
    cy.intercept('GET', 'http://localhost:8080/composite/info').as(
      'getLoginPage'
    );
    cy.intercept('GET', 'http://localhost:8080/api/v1/user').as('getUser');
    LoginPage.open();
    cy.wait('@getLoginPage').then((interception) => {
      response = interception.response;
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.have.property('api');
    });
    LoginPage.logInUser(Cypress.env('username'), Cypress.env('password'));
    cy.url().should('include', urls.dashboardPage);
    cy.wait('@getUser').then((interception) => {
      response = interception.response;
      expect(response.statusCode).to.equal(200);
      expect(response.body.data.userId).to.have.value('hanna.bicheuskaya');
    });
  });
});
