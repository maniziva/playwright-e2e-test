import { test, request, expect } from "playwright/test";

test.describe("Dec-18 API Test Suite", async () => {
  const baseURL = "https://thinking-tester-contact-list.herokuapp.com";
  const username = "master@gmail.com";
  const password = "Info@1234";
  let token: string = "";

  test.beforeAll("Dec18 - 1. Login", async () => {
    const apiContext = await request.newContext();

    const loginReq = await apiContext.post(`${baseURL}/users/login`, {
      data: {
        email: username,
        password: password,
      },
    });
    //console.log(loginReq);
    expect(loginReq.ok()).toBeTruthy();
    const loginres = await loginReq.json();
    //console.log(loginres);

    token = await loginres.token;
    //console.log(token);
  });

  test("Dec18 - GetUser", async () => {
    const apiContext = await request.newContext();

    const getReq = await apiContext.get(`${baseURL}/users/me`, {
      headers: {
        Authorization: token,
      },
    });
    expect(getReq.ok()).toBeTruthy();

    const getRes = await getReq.json();
    console.log(getRes);
  });

  test("Dec18 - Get contact", async () => {
    const apiContext = await request.newContext();

    const getContactReq = await apiContext.get(`${baseURL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const getContactRes = await getContactReq.json();
    console.log(getContactRes);

    const filteredData = getContactRes.filter(
      (item: any) => item.phone === "8005555555"
    );
    // console.log(filteredData ? filteredData.firstName : "No Data Found");

    // for(const name of filteredData){
    //     console.log(name ? name.firstName : "No Data Found");
    // }

    filteredData.forEach((item: any) => {
      console.log(item.firstName);
    });
  });
});
