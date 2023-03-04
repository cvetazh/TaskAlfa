import { test, expect } from '@playwright/test';
import { LoginPage } from '../../ApplicationLogic/ApplicationUILogic/Pages/loginPage';
import { HomePage } from '../../ApplicationLogic/ApplicationUILogic/Pages/homePage';
import { user1 } from '../../TestData/userManager';

test.describe('Basket Container', async () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({page}) =>{
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.goto('https://enotes.pointschool.ru/login');
    await loginPage.login(user1.login, user1.password);
    await expect(page).toHaveURL('https://enotes.pointschool.ru/');
    await expect(homePage.Element.username).toHaveText(user1.login);
  })  
  test.afterEach(async ({page}) => {
    await page.close();
  });

  test('Go to an empty shopping cart', async ({page}) => {
    await homePage.Basket.basket.click();
    await expect(homePage.Basket.basketPopup).toBeVisible()
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('https://enotes.pointschool.ru/basket')
  });

  test('Go to the shopping cart with 1 discountless item', async ({page}) => {

    let randomCart = await homePage.getRandomCard(false);
    await homePage.clickBuyProduct(randomCart);
    let productName = await homePage.getProductName(randomCart);
    let productPrice = await homePage.getProductPrice(randomCart);
    await expect(homePage.Basket.basketCountItem).toHaveText('1');
    await homePage.Basket.basket.click();
    let listBasketProduct = await homePage.getBasketItemList();
    await expect(listBasketProduct).toContain(productName + ' ' + productPrice);
    await expect(homePage.Basket.totalBasketPrice).toContainText(productPrice);
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('https://enotes.pointschool.ru/basket');

  });

  test('Go to the shopping cart with 1 discount item', async ({page}) => {

    let randomCart = await homePage.getRandomCard(true);
    await homePage.clickBuyProduct(randomCart);
    let productName = await homePage.getProductName(randomCart);
    let productPrice = await homePage.getProductPrice(randomCart);
    await expect(homePage.Basket.basketCountItem).toHaveText('1');
    await homePage.Basket.basket.click();
    let listBasketProduct = await homePage.getBasketItemList();
    await expect(listBasketProduct).toContain(productName + ' ' + productPrice);
    await expect(homePage.Basket.totalBasketPrice).toContainText(productPrice);
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('https://enotes.pointschool.ru/basket');

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
    let listBasketProduct = await homePage.getBasketItemList();
    await expect(listBasketProduct).toContain(productName + ' ' + productPrice*needCountCard);
    await expect(homePage.Basket.totalBasketPrice).toContainText(String(productPrice*needCountCard));
    await homePage.Basket.goToBasket.click();
    await expect(page).toHaveURL('https://enotes.pointschool.ru/basket');

  });

})






