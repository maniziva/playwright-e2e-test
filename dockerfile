# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
# COPY . .

# Install Playwright dependencies
# RUN npx playwright install-deps

# Install Playwright browsers
# RUN npx playwright install

# Set environment variables (if needed)
# ENV BASEURL=<your_base_url>
# ENV MAILID=<your_mail_id>
# ENV PASSWORD=<your_password>

# Command to run the tests
CMD ["npx", "playwright", "test"]