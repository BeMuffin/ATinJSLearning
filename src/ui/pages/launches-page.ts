import Page from './page'

class LaunchesPage extends Page{
    url = '/launches/all'

    get['Select all launches checkbox'](){
        return `//div[starts-with(@class, 'checkIcon__square')]`
    }
    get['Actions dropdown'](){
        return `//div[starts-with(@class, "ghostMenuButton__ghost")]`
    }

    get['Actions container'](){
        return `//div[starts-with(@class,'ghostMenuButton__menu-item')]`
    }

    get['Launch row'](){
        return `//div[starts-with(@class, 'gridRow__grid-row-wrapper')]`
    }
}

export default new LaunchesPage();
