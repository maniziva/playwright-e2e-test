import { expect, test } from "@playwright/test";
import * as fs from "fs";

test.describe.parallel("API Practice", async () => {
  let { token } = JSON.parse(
    fs.readFileSync("./src/setup/auth-token.json", "utf-8")
  );

  test.skip("Login Request", async ({ request }) => {
    const loginResponse = await request.post("/users/login", {
      data: {
        email: process.env.MAILID,
        password: process.env.PASSWORD,
      },
    });
    expect(loginResponse.ok()).toBeTruthy();

    const responseBody = await loginResponse.json();
    //console.log('Login Response:', responseBody);

    token = responseBody.token; // Assign token here
    expect(token).toBeDefined();
  });

  test("Get contact", async ({ request }) => {
    const getResponse = await request.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    const getResponseData = await getResponse.json();
    console.log(getResponseData);
    expect(getResponseData.email).toContain("master@gmail.com");
  });
});
