FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./packages/orders/prisma ./prisma/
COPY ./packages/orders/package*.json ./

RUN npm cache clean --force
RUN npm install

COPY ./packages/orders/ ./

USER node

CMD ["npm", "run", "start:dev"]