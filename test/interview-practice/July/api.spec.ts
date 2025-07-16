import { expect, test } from "@playwright/test";

test.describe.serial("API suite", () => {
  let token: string;
  test("Login API", async ({ request }) => {
    const req = await request.post(
      "https://thinking-tester-contact-list.herokuapp.com/users/login",
      {
        data: {
          email: "master@gmail.com",
          password: "Info@1234",
        },
      }
    );
    const res = await req.json();
    console.log(res);
    token = res.token;
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
    const res = await req.json();
    console.log(res);
  });
});
