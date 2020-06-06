# todolistUi

todolistUi

## Requirement:
 - install yarn
 - install node (v12+)

## Testing and run:
```
$ yarn

// development
$ yarn run dev

// production
$ yarn run start

// run type check
$ yarn run type-check

// use eslint and prettier to format code
$ yarn run lint
```

open localhost:5000

## Docker:

- Dockerfile

build images and start container
```
docker build -t <username>/todo-list-ui:<tag> .
docker run -p 5000:5000 -d <username>/todo-list-ui:<tag>
docker exec -it <containerId> /bin/bash
docker logs <containerId>
```

check images and container
```
docker images
docker ps
docker ps -a
```

open localhost:5000

- docker-compose.yml

build images and start container
```
docker-compose build
docker-compose up
```

build images and start container in one line
```
docker-compose up -d --build
```

stop container
```
docker-compose stop
```

add tag to docker images
```
$ docker tag <imageId> <dockerHubUserName>/<imageName>:<tag>
```

push docker images to docker hub
```
$ docker push <dockerHubUserName>/<imageName>:<tag>
```

open localhost:5000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/todolistUi/blob/master/CONTRIBUTING.md)