import { expect, request, test } from "playwright/test";
import * as fs from "fs";

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

  test("2. Contact API", async () => {
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

    fs.writeFileSync(
      "src/download/dec20.json",
      JSON.stringify(contactRes, null, 2)
    );
  });

  test("3. Update API", async () => {
    const jsonData = JSON.parse(
      fs.readFileSync("src/download/dec20.json", "utf-8")
    );
    const data = jsonData.find((item: any) => item.firstName === "John4");
    const id = data ? data._id : "Not Found";
    console.log(id);

    const apiContext = await request.newContext();
    const updContactReq = await apiContext.put(`${baseURL}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        firstName: "John4",
        lastName: "UpdateContact",
        birthdate: "1992-02-02",
        email: "amiller@fake.com",
        phone: "8005554242",
        street1: "13 School St.",
        street2: "Apt. 5",
        city: "Washington",
        stateProvince: "QC",
        postalCode: "A1A1A1",
        country: "Canada",
      },
    });
    await expect(updContactReq.status()).toBe(200);
    const updContactRes = await updContactReq.json();
    console.log(updContactRes);
  });
});
