FROM node:16-buster-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 2000
CMD [ "npm", "start" ]