FROM node:18-alpine3.17

COPY ./package.json /app/package.json
COPY ./node_modules /app/node_modules
COPY ./tsconfig.base.json /app/tsconfig.base.json
COPY ./tsconfig.poller.json /app/tsconfig.poller.json
WORKDIR /app
RUN apk add tini

COPY ./src/poller /app/src/poller
RUN npm run build:poller

ENTRYPOINT ["tini", "-v", "--", "node", "build/poller/main.js"]
