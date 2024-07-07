FROM node:20-alpine as build

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app 

RUN npm ci 

COPY . .

ENV PORT 5001

EXPOSE $PORT

CMD ["npm", "run", "start:dev"]
