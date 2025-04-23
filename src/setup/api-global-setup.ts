import { request, FullConfig } from "@playwright/test";
import * as fs from "fs";

async function globalSetup(config: FullConfig) {
  const requestContext = await request.newContext();

  const response = await requestContext.post(process.env.BASEURL+"users/login",
    {
      data: {
        email: process.env.MAILID,
        password: process.env.PASSWORD,
      },
    }
  );

  const body = await response.json();
  const token = body.token; // Adjust based on your response structure

  // Save token to JSON file
  fs.writeFileSync("./src/setup/auth-token.json", JSON.stringify({ token }));

  await requestContext.dispose();
}

export default globalSetup;