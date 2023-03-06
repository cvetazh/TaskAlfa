import { request } from '@playwright/test';

export default async function clearBasket() {
  const cookie = 'PHPSESSID=25b882164688a79b34fec986901d5db5; _csrf=c6e6b68c37d54efe407e24488bf4116b35a1000c36c8e2c7bb445b4ac175baa9a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22pIThv4RWIfCKIYvsuw6p6M6N7N64wwyN%22%3B%7D';
  const token = 'RnGwYbj14WKGXMHDdj5kpjLdczgXD6rf4D_SzKTS2242OOQJzsGzNc86gog_ZxLVR6pFSCFCnJHXceT406WiIA==';
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