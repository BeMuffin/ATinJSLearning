import BasePage from './base.page';

class LaunchesPage extends BasePage {

    constructor(){
        super();
    }
    get ['Launches Page Buttons'](){
        return `ul[class*=pageButtons]`
    }

    scrollToPagesButtons(){
        const pageButtonsElement = cy.get(this['Launches Page Buttons']);
        super.scrollToElement(pageButtonsElement)
        super.isScrolledToElement(pageButtonsElement);
    }

}

export default new LaunchesPage();
