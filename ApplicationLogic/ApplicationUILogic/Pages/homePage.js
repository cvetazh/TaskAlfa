import {BasePage} from './basePage';

export class HomePage extends BasePage {
  constructor(page){
    super(page);
  }

  Element = {
    username: this.page.locator('#dropdownUser'),
    basket: this.page.locator('#dropdownBasket'),
    basketPopup: this.page.locator('[aria-labelledby="dropdownBasket"]'),
    sleep : this.page.locator('#dropdownBasketssss'),
  }

  Button = {
    goToBasket: this.page.locator('div[aria-labelledby="dropdownBasket"] > div:nth-child(3)')
  }

}

