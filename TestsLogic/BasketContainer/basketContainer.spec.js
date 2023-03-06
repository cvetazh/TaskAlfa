import { test, expect } from '@playwright/test';
import clearBasket from '../../ApplicationLogic/ApplicationAPILogic/clearBasketApi'
import addProduct from '../../ApplicationLogic/ApplicationAPILogic/addProductBasketApi'
import { HomePage } from '../../ApplicationLogic/ApplicationUILogic/Pages/homePage';

test.describe('Basket Container', async () => {
  let homePage;

  test.beforeEach(async({page}) =>{
    homePage = new HomePage(page);
    await clearBasket();
    await page.goto('/');
  })  

  test.afterEach(async ({page}) => {
    await page.close();
  })

  test('Go to an empty shopping cart', async ({page}) => {
    await homePage.Basket.basket.click();
    await expect(homePage.Basket.basketPopup).toBeVisible()
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('/basket');
  });

  test('Go to the shopping cart with 1 discountless item', async ({page}) => {
    const needCountCard = 1;

    let randomCart = await homePage.getRandomCard(false);
    await homePage.clickBuyProduct(randomCart);
    let productName = await homePage.getProductName(randomCart);
    let productPrice = await homePage.getProductPrice(randomCart);
    await expect(homePage.Basket.basketCountItem).toHaveText(String(needCountCard));
    await homePage.Basket.basket.click();
    let listBasketProduct = await homePage.getInfoBasketItemList();
    await expect(listBasketProduct).toContain(productName + ' ' + productPrice);
    await expect(homePage.Basket.totalBasketPrice).toContainText(productPrice);
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('/basket');

  });

  test('Go to the shopping cart with 1 discount item', async ({page}) => {
    const needCountCard = 1;

    let randomCart = await homePage.getRandomCard(true);
    await homePage.clickBuyProduct(randomCart);
    let productName = await homePage.getProductName(randomCart);
    let productPrice = await homePage.getProductPrice(randomCart);
    await expect(homePage.Basket.basketCountItem).toHaveText(String(needCountCard));
    await homePage.Basket.basket.click();
    let listBasketProduct = await homePage.getInfoBasketItemList();
    await expect(listBasketProduct).toContain(productName + ' ' + productPrice);
    await expect(homePage.Basket.totalBasketPrice).toContainText(productPrice);
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('/basket');

  });

  test('Go to the shopping cart with 9 discount items of the same name', async ({page}) => {
    const needCountCard = 9;

    let cardWithSameName = await homePage.getCardWithSameName(needCountCard);

    for(let i = 0; i < needCountCard; i++){
      await homePage.clickBuyProduct(cardWithSameName);
    }

    await expect(homePage.Basket.basketCountItem).toHaveText(String(needCountCard));
    let productName = await homePage.getProductName(cardWithSameName);
    let productPrice = await homePage.getProductPrice(cardWithSameName);
    await homePage.Basket.basket.click();
    let listBasketProduct = await homePage.getInfoBasketItemList();
    await expect(listBasketProduct).toContain(productName + ' ' + productPrice*needCountCard);
    await expect(homePage.Basket.totalBasketPrice).toContainText(String(productPrice*needCountCard));
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('/basket');
  });

  test('Go to the shopping cart with 9 different items', async ({page}) => {
    await addProduct();
    await page.reload();
    const needCountCard = 9;
    await homePage.Basket.basket.click();
    let existedCardName = await homePage.getProductNameFromBasket();
    let existedTotalSum = Number(await homePage.Basket.totalBasketPrice.innerText());
    let listBuyProduct = await homePage.getListBuyProduct(existedCardName, existedTotalSum);
    await homePage.Element.secondPage.click();
    await page.waitForTimeout(2000);
    let additionalCard = await homePage.getRandomCard(false);
    await homePage.clickBuyProduct(additionalCard);
    listBuyProduct.set(await homePage.getProductName(additionalCard), Number(await homePage.getProductPrice(additionalCard)));
    await expect(homePage.Basket.basketCountItem).toHaveText(String(needCountCard));
    await homePage.Basket.basket.click();
    await page.waitForTimeout(3000);
    let listBasketProduct = await homePage.getInfoBasketItemList();
    listBuyProduct.forEach((values, keys)=>{
      let productPrice = values;
      let productName = keys;
      expect(listBasketProduct).toContain(productName + ' ' + productPrice);
    })
    let totalBasketPrice = await homePage.getTotalBasketPrice(listBuyProduct);
    await expect(homePage.Basket.totalBasketPrice).toContainText(String(totalBasketPrice));
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('/basket');
  });

});







