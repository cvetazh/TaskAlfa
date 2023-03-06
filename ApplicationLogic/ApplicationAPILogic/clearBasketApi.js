import { request } from '@playwright/test';

export default async function clearBasket() {
  const cookie = 'PHPSESSID=561c3ea152061cdafbf29db3183608d1; _csrf=11818a65e1d22009b0e40837ddfe17b39c160a35ec3c3d57ea2097fc8607b2b2a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22oKBjtgHnyR6b9pUEldyYmA8d-20OEGFS%22%3B%7D';
  const token = 'IG2cxSltz2xYrJBqNWITryQ19PvtfVDWOv5MDSOEHHJPJt6vXQqHAiH-pggMEkbqSFGNooA8aLIXzHxCZsNaIQ==';
  const apiContext = await request.newContext();
  const response = await apiContext.post('https://enotes.pointschool.ru/basket/clear', {
    headers: {
      Accept: 'application/json, text/javascript, */*; q=0.01',
      Connection: 'keep-alive',
      Cookie: cookie,
      'X-CSRF-Token': token
    },
  });
}