# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the container's port (optional)
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]
