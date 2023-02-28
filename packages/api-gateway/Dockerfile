FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./packages/api-gateway/prisma ./prisma/
COPY ./packages/api-gateway/package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY ./packages/api-gateway/ ./


CMD ["npm", "run", "start:dev"]