import { expect, request, test } from "playwright/test";

test.describe("Dec-20 Test suite", async () => {
  const baseURL = "https://thinking-tester-contact-list.herokuapp.com";
  let token = "";
  test.beforeEach("1. Login API", async () => {
    const apiContext = await request.newContext();
    const loginReq = await apiContext.post(`${baseURL}/users/login`, {
      data: {
        email: "master@gmail.com",
        password: "Info@1234",
      },
    });
    //expect(loginReq.ok()).toBeTruthy();
    await expect(loginReq.status()).toBe(200);
    const loginRes = await loginReq.json();
    //console.log(loginRes);
    token = await loginRes.token;
  });

  test("2. Login API", async () => {
    const apiContext = await request.newContext();
    const contactReq = await apiContext.get(`${baseURL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //await expect(contactReq.status()).toBe(200);
    console.log(token);
    const contactRes = await contactReq.json();
    console.log(contactRes);
  });
});
