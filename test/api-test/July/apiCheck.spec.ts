import { expect, test } from '@playwright/test';

test('Login check', async({ request }) =>{

  const req = await request.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
    data : {
      email : "master@gmail.com",
      password : "Info@1234"
    },
  });
  //console.log(req);
  await expect(req.status()).toBe(200);

  const res = await req.json();
  console.log(res);

  const name = res.user.firstName;
  console.log(name);
})