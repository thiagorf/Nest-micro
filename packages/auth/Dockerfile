FROM node:16-alpine

WORKDIR /usr/app

COPY ./packages/auth/prisma ./prisma/
COPY ./packages/auth/package.json ./

RUN npm install

COPY ./packages/auth/ ./

RUN npx prisma generate

USER node

CMD ["npm", "run", "start:dev"]

