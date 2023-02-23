FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./apps/api-gateway/prisma ./prisma/
COPY package*.json ./

RUN npm install

COPY ./apps/api-gateway/ ./


CMD ["npm", "run", "nest", "start:dev", "api-gateway"]