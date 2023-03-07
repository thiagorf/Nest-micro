FROM node:16-alpine3.16 as dev

WORKDIR /usr/app


COPY ./packages/billing/prisma ./prisma/
COPY ./packages/billing/package*.json ./

RUN npm install

COPY ./packages/billing/ ./

RUN npx prisma generate

USER node

CMD ["npm", "run", "start:dev"]

