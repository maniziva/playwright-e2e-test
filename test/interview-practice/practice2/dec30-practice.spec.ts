import { expect,request,test } from "playwright/test";

test.describe("Dec-28 Test suite", async () => {
  const baseURL = "https://thinking-tester-contact-list.herokuapp.com";

  test("API Test", async () => {
    const apiContext = await request.newContext();

    const loginReq = await apiContext.post(`${baseURL}/users/login`, {
      data: {
        email: "master@gmail.com",
        password: "Info@1234",
      },
    });

    const loginRes = await loginReq.json();
    console.log(loginRes);

    await expect(loginReq.status()).toBe(200);

    const name = await loginRes.user.firstName;
    console.log(name);
  });
});
