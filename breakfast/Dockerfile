ARG SERVER_PORT=3000

FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN nest build
COPY *.env ./dist/
WORKDIR /usr/app/dist

EXPOSE $SERVER_PORT

CMD node main