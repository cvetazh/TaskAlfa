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
    await homePage.Element.basket.click();
    await expect(homePage.Element.basketPopup).toBeVisible()
    await homePage.Button.goToBasket.click();
    await expect(page).toHaveURL('https://enotes.pointschool.ru/basket')
  });



})




