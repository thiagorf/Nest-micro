FROM node:16-alpine3.16 as dev

WORKDIR /usr/app

COPY ./apps/billing/prisma ./prisma/
COPY package*.json ./

RUN npm install

COPY ./apps/billing/ ./

#RUN npx prisma migrate deploy --schema ./prisma/schema.prisma

CMD ["npm", "run", "nest", "start:dev", "billing"]

