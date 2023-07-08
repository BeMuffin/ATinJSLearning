import BasePage from '../base.page';

class MenuComponent extends BasePage {
  get ['Open Profile Button']() {
    return `[alt='avatar']`;
  }

  get ['Logout Menu Button']() {
    return `a[href='#api'] + div`;
  }

  get ['Launches Menu Button']() {
    return `a[href*=launches]`;
  }

  get ['Hamburger Menu Button']() {
    return `[class*=mobileHeader__hamburger]:has(div)`;
  }

  get ['Sidebar Menu Container']() {
    return `[class*=sidebar__top]`;
  }
}

export default new MenuComponent();
