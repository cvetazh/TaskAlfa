import { BasePage } from './basePage';

export class HomePage extends BasePage {

  constructor(page) {
    super(page);
  }

  Element = {
    username: this.page.locator('#dropdownUser'),
    secondPage: this.page.locator('.page-item:nth-child(2)')
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
    cardHasDiscount: this.page.locator('div.note-list > div > div.hasDiscount'),
    allCardList: this.page.locator('div.note-list > div')
  }

  async getRandomCard(discount) {
    let countCards;
    let randomItem;

    if (discount) {
      countCards = await this.Item.cardHasDiscount.count();
      return randomItem = await this.Item.cardHasDiscount.nth(Math.floor(Math.random() * countCards));
    }
    else {
      countCards = await this.Item.cardsWithinDiscount.count();
      return randomItem = await this.Item.cardsWithinDiscount.nth(Math.floor(Math.random() * countCards));
    }
  }

  async clickBuyProduct(card) {
    await card.getByRole('button', { name: 'Купить' }).click();
  }

  async getProductName(card) {
    let productName = await card.locator('.product_name').innerText();;
    return productName;
  }

  async getProductPrice(card) {
    let infoProductList = await card.locator('.product_price').innerText();
    return infoProductList.match(/\d+(?= р)/g)[0];
  }

  async getInfoBasketItemList() {
    let basketItemList = [];
    for (const li of await this.Basket.basketItemList.getByRole('listitem').all()) {
      let itemTitle = await li.locator('.basket-item-title').innerText();
      let itemPrice = await li.locator('.basket-item-price').innerText();
      let infoItem = itemTitle + ' ' + itemPrice.match(/\d+/g)[0];
      basketItemList.push(infoItem);
    }
    return basketItemList;
  }

  async getProductNameFromBasket() {
    let productName = await this.Basket.basketItemList.locator('.basket-item-title').innerText();
    return productName;
  }

  async getCardWithSameName(needCount) {
    let getProductCount = await this.Item.cardHasDiscount.locator('.product_count ').allTextContents();
    let index = getProductCount.findIndex(productCount => productCount >= needCount);
    if (index != -1) {
      return this.Item.cardHasDiscount.nth(index);
    }
  }

  async getListBuyProduct(existedCardName, existedTotalSum) {
    let listProduct = new Map([[existedCardName, existedTotalSum]]);
    for (const card of await this.Item.allCardList.all()) {
      let productName = await this.getProductName(card);
      let productPrice = Number(await this.getProductPrice(card));
      if (!listProduct.has(productName)) {
        await this.clickBuyProduct(card);
        listProduct.set(productName, productPrice);
      }
    }
    return listProduct;
  }

  async getTotalBasketPrice(listBuyProduct) {
    return Array.from(listBuyProduct.values()).reduce((sum, price) => { return sum + price; }, 0);
  }

}