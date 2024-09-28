FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install react-is

COPY . .

EXPOSE 3002

CMD ["yarn", "server"]