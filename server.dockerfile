FROM node:18-alpine3.17

COPY ./package.json /app/package.json
COPY ./node_modules /app/node_modules
COPY ./tsconfig.base.json /app/tsconfig.base.json
COPY ./tsconfig.server.json /app/tsconfig.server.json
WORKDIR /app
RUN apk add tini

COPY ./src/server /app/src/server
RUN npm run build:server

CMD ["tini", "-v", "--", "npm", "run", "start:server"]
