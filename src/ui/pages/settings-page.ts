import Page from './page';

class SettingsPage extends Page{
    url = 'settings/general'

    get ['Demo data tab'](){
        return 'a+a[href*="demoData"]'
    }

    get ['Demo data button'](){
        return '[type=button]'
    }

}

export default new SettingsPage();
