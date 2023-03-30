## How to run

`docker compose up` that's it

## Observations

I don't know the ideal way of performing an authentication request on a microservices architecture, it is most likely to be something around JWT, and maybe the auth service is going to be merged with the api gateway.

After weeks of research, I decided to use an OS solution rather than my own because it's pretty hard to set up a good auth system in a microservices, and a Api Gateway is more than a proxy. The tools I will be using are Kong and Ory

## TODO

- Kong requires extra steps to make it fully functional, it needs to make 5-6 REST api calls to the Kong api, find a way to automate this.
