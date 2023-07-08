import './commands';

beforeEach(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // this error returns 502 and it doesn't depends on UI tests

    if (err.message.includes('JSONP request to https://status.reportportal.io/twitter'))
    {
      return false;
    }
    const timeStamp = new Date().toISOString().replace(/:/g, '-');
    cy.screenshot(`exception-${timeStamp}`);
  });
});

Cypress.on('fail', (error) => {
  // Use a timestamp to create a unique filename
  const timeStamp = new Date().toISOString().replace(/:/g, '-');
  const filename = `failure-${timeStamp}`;

  // Capture the screenshot and save it in the 'screenshots' folder
  cy.screenshot(`${filename}`);
  // });
});

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});
