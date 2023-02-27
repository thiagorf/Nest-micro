FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./apps/orders/prisma ./prisma/
COPY ./libs/common ./common/
COPY package*.json ./

RUN npm install

COPY ./apps/orders/ ./
COPY tsconfig.json ./

#RUN npx prisma migrate deploy --schema ./prisma/schema.prisma

CMD ["npm", "run", "nest", "start:dev", "order"]