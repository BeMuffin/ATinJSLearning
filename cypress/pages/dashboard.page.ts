import BasePage from './base.page';
import MenuComponent from '../pages/components/menu.page';

class DashboardPage extends BasePage {
  constructor() {
    super();
  }
  get ['Success Login Notification']() {
    return `#notification-root p`;
  }

  waitForUserLogOut() {
    super.waitForDropDownElementAndClick(
      MenuComponent['Open Profile Button'],
      MenuComponent['Logout Menu Button']
    );
  }

  waitForOpenLaunchesPage() {
    const currentResolution = super.getBrowserResolution();
    const isMenuDisplayed = super.isElementDisplayed(
      MenuComponent['Sidebar Menu Container']
    );
    if (currentResolution.width < 768 || isMenuDisplayed === false) {
      super.waitForElementAndClick(MenuComponent['Hamburger Menu Button']);
      super.waitForElementAndClick(MenuComponent['Launches Menu Button']);
    } else {
      super.waitForElementAndClick(MenuComponent['Launches Menu Button']);
    }
  }
}

export default new DashboardPage();
