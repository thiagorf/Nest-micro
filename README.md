## Observations

Each service can run independently but requires an order of steps to work.

1. generate the prisma client each time you make some changes in the schema
2. generate the migrations
3. apply everything

respectively:

```
services: billing, orders, auth(wip)

yarn generate:{service name}
yarn migrations:{service name}
yarn create:{service name}
```

This project is a microservice that is hosted in a monorepo (it does look like a distributed monolith but it's a convincing way to showcase a microservice) and if you want to test it just run `yarn micro:start` (assuming you have docker and node installed)

There will be changes in the docker startup because at the moment it requires an installation of node in the host machine (docker and prisma don't mix well in the most case e.g. if the database isn't created at the start of the api an exception will be raised)
