import Page from './page';

class LoginPage extends Page {
    url = '/#login';
    fullUrl = `https://rp.epam.com/ui/#login`;

    get ['Login input field'](){
        return '[name = login]'
    }

    get ['Password input field'](){
        return '[name = password]'
    }

    get ['Login button'](){
        return 'button[type=submit]'
    }
}

export default new LoginPage();