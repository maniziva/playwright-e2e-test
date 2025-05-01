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
    const getResponse = await request.get("users/me", {
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

  test.only("Get My name", async ({ request }) => {
    const getResponse = await request.get("contacts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await getResponse.json();
    // const name = jsonData
    //   .filter(emp => emp._id === '680fac5591094c00157ae9a9')
    //   .map(emp => emp.firstName);
    
    // console.log("Matched name:", name[0]); // ['John'] or []


    const reg: RegExp = /"_id":"(.*?)",/i;
    const phone = jsonData.filter(emp => emp.phone?.includes("8098"));
    console.log(phone);

    //const jsonString = JSON.stringify(phone);
    //console.log(jsonString);


    const id: string[] = phone.map(emp => emp._id);
    console.log(`Extracted ID is: ${id.length}`);

  });
  
});
