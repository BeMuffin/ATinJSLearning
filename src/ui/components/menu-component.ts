import Page  from '../pages/page';

class DashBoardMenu extends Page{
    get ['Launches menu button'](){
        return `a[href*='launches']`;
    }

    get ['Projects menu button'](){
        return 'aside div:first-child'
    }

    get ['Projects menu list'](){
        return `[data-placement='right-end'] a`
    }

    get ['Settings menu button'](){
        return `a[href*='settings']`
    }
}

export default new DashBoardMenu();
