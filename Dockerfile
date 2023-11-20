# Use the official Node.js image as the base image
FROM node:20.9.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose the port on which the Node.js server will run
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
