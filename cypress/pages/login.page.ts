import BasePage from './base.page';
import {urls} from '../fixtures/urls'

class LoginPage extends BasePage {
  constructor() {
    super();
  }

  get ['Login input field']() {
    return `[name='login']`;
  }

  get ['Password input field']() {
    return '[name=password]';
  }

  get ['Login button']() {
    return 'button[type=submit]';
  }

  get ['Bad Credentials Notification'] () {
    return '#notification-root p';
  }

  open() {
    super.open(urls.loginPage);
  }

  logInUser(userName, password) {
    cy.get(this['Login input field']).type(userName);
    cy.get(this['Password input field']).type(password);
    cy.get(this['Login button']).click();
  }

  waitForBadCredentialsNotificationDisplay(){
    return super.waitForElementDisplay(this['Bad Credentials Notification'])
  }
}

export default new LoginPage();
