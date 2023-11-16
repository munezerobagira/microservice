FROM node:18-alpine
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install --only=prod
CMD ["npm", "start"]
