# Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:16

RUN apt-get update \
    && apt-get install -y unzip \
    && curl -L -o sonar-scanner-cli.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.2.2472-linux.zip \
    && unzip sonar-scanner-cli.zip \
    && rm sonar-scanner-cli.zip \
    && mv sonar-scanner-* /opt/sonar-scanner \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PATH $PATH:/opt/sonar-scanner/bin
# Set the working directory to /project
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci
RUN apt-get update && apt-get install -y libnss3
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y \
    google-chrome-stable

# Copy the rest of the application code to the container
COPY . .

# Run the tests
CMD ["npm", "run", "test:ui"]
