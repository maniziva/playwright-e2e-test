# Use the official Playwright image as the base image
FROM mcr.microsoft.com/playwright:v1.32.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set environment variables (if needed)
# ENV BASEURL=<your_base_url>
# ENV MAILID=<your_mail_id>
# ENV PASSWORD=<your_password>

# Command to run the tests
CMD ["npx", "playwright", "test"]