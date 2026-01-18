# Step 1: Base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all project files
COPY . .

# Step 6: Expose port
EXPOSE 3000

# Step 7: Command to run the app
CMD ["npm", "start"]
