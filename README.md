# Prometheus Workshop

### docker commands:
- `docker compose up --build` - bring up the whole project (I suggest providing the `--build` flag all the time to aviod any problems when switching beween tasks)
- `docker exec -it <name_of_container> sh` - attach shell to the container. Please, note that all the containers in this project are named and you can find the names in the `docker-compose.yml`
- `docker compose down` - remove all the containers, volumes, the network

### npm commands:
- `npm run start:server` - start the server
- `npm run build:server` - build the server
- `npm run start:poller` - start the poller
- `npm run build:poller` - build the poller

### Available on host machine:
- `localhost:23054` - the server application
- `localhost:23055` - Prometheus instance (also the expression browser)
- `localhost:29093` - alertmanager (also the Web UI)

### Available within the docker network:
- `prom_ws_collector:9090` - Prometheus instance
- `prom_ws_server:9100` - node_exporter running in the server container
- `prom_ws_server:80` - the server application
- `prom_ws_alertmanager:9093` - alertmanager

### Name of the Slack channel connected to the alerts:
`#alertmanager-test`
