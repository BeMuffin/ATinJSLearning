import './commands';

beforeEach(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('JSONP request to https://status.reportportal.io/twitter'))
    {
      return false;
    }
    const timeStamp = new Date().toISOString().replace(/:/g, '-');
    cy.screenshot(`exception-${timeStamp}`);
  });
});

Cypress.on('fail', (error) => {
  const timeStamp = new Date().toISOString().replace(/:/g, '-');
  const filename = `failure-${timeStamp}`;

  cy.screenshot(`${filename}`);
});

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});
