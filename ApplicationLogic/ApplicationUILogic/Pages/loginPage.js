import {BasePage} from './basePage';

export class LoginPage extends BasePage {

    constructor(page){
        super(page);
    }

  InputBox = {
    login: this.page.locator('#loginform-username'),
    password: this.page.locator('#loginform-password'),
  };

  Buttons = {
    login: this.page.locator('[name="login-button"]'),
  };

  async login(login, password) {
    await this.InputBox.login.type(login);
    await this.InputBox.password.type(password);
    await this.Buttons.login.click();
  }
}
