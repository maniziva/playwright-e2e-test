import { expect, test } from "@playwright/test";

test.describe.serial.only("API suite", () => {
  let token;

  test("Login check", async ({ request }) => {
    const loginPayload = {
      email: "master@gmail.com",
      password: "Info@1234",
    };
    const req = await request.post(
      "https://thinking-tester-contact-list.herokuapp.com/users/login",
      {
        data: loginPayload,
      }
    );
    await expect(req.status()).toBe(200);
    const res = await req.json();
    token = await res.token;
  });

  test("Get user", async ({ request }) => {
    const req = await request.get(
      "https://thinking-tester-contact-list.herokuapp.com/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await expect(req.status()).toBe(200);
    const res = await req.json();
    console.log(res);
  });
});
