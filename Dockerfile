# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g @expo/cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port for Expo dev server
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Start Expo development server
CMD ["npx", "expo", "start", "--web", "--host", "0.0.0.0"]