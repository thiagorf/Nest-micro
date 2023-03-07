FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./packages/orders/prisma ./prisma/
COPY ./packages/orders/package*.json ./

RUN npm install

COPY ./packages/orders/ ./

RUN npx prisma generate

USER node

CMD ["npm", "run", "start:dev"]