import {BasePage} from './basePage';

export class HomePage extends BasePage {
  constructor(page){
    super(page);
  }

  Element = {
    username: this.page.locator('#dropdownUser'),
    sleep : this.page.locator('#dropdownBasketssss'),
  }

  Basket = {
    basket: this.page.locator('#dropdownBasket'),
    basketCountItem: this.page.locator('.basket-count-items'),
    basketPopup: this.page.locator('[aria-labelledby="dropdownBasket"]'),
    goToBasket: this.page.locator('div[aria-labelledby="dropdownBasket"] > div:nth-child(3)'),
    basketItemList: this.page.locator('ul.list-group'),
    totalBasketPrice: this.page.locator('.basket_price')
  }


  Item = {
    cardsWithinDiscount: this.page.locator('div.note-list > div > div:not(.hasDiscount)'),
    cardHasDiscount: this.page.locator('div.note-list > div > div.hasDiscount')
  }

  async getRandomCard(discount){
    let countCards;
    let randomItem;

    if(discount){
      countCards = await this.Item.cardHasDiscount.count();
      return randomItem = await this.Item.cardHasDiscount.nth(Math.floor(Math.random() * countCards));
    }
    else {
      countCards = await this.Item.cardsWithinDiscount.count();
      return randomItem = await this.Item.cardsWithinDiscount.nth(Math.floor(Math.random() * countCards));
    }

  }

  async buyProduct(card){

   await card.getByRole('button', { name: 'Купить' }).click();
   await this.page.waitForTimeout(300);  

  }
  
  async getProductName(card){

    let productName = await card.locator('.product_name').innerText();;
    return productName;

  }

  async getProductPrice(card){

    let infoProductList = await card.locator('.product_price').innerText();
    return infoProductList.match(/\d+(?= р)/g)[0];
    
  }

  async getBasketItemList(){

    let basketItemList = [];

    for (const li of await this.Basket.basketItemList.getByRole('listitem').all()){

      let itemTitle = await li.locator('.basket-item-title').innerText();
      let itemPrice  = await li.locator('.basket-item-price').innerText();
      let infoItem = itemTitle + ' ' + itemPrice.match(/\d+/g)[0];
      basketItemList.push(infoItem);

    }

    return basketItemList;
  }

}

