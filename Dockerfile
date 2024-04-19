FROM node:18-alpine

WORKDIR /app

COPY package.json /app 

RUN npm install

COPY . .

ENV PORT 5001

EXPOSE $PORT

CMD ["npm", "run", "start:dev"]
