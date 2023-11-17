FROM node:18-alpine3.17

COPY ./package.json /app/package.json
COPY ./tsconfig.base.json /app/tsconfig.base.json
COPY ./tsconfig.poller.json /app/tsconfig.poller.json
WORKDIR /app
RUN npm install && apk add tini

COPY ./src/poller /app/src/poller
RUN npm run build:poller

CMD ["tini", "-v", "--", "npm", "run", "start:poller"]
