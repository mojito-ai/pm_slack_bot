# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (App Runner uses 8080 by default)
ENV PORT=8080
EXPOSE 8080

# Run the bot
CMD ["node", "index.js"]
