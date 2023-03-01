FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./packages/api-gateway/prisma ./prisma/
COPY ./packages/api-gateway/package*.json ./

RUN npm cache clean --force
RUN npm install

COPY ./packages/api-gateway/ ./


CMD ["npm", "run", "start:dev"]