# block-producers-directory-front
Front-end of directory of block producers based around Remme Protocol.

  * [Development](#development)
  * [Production](#production)

## Development

Clone the project with the following command:

```bash
$ git clone https://github.com/remmeauth/block-producers-directory-front.git
$ cd block-producers-directory-front
```

To build the project, use the following command:

```bash
$ docker-compose -f docker-compose.development.yml build
```

To run the project, use the following command. It will start the server and occupate current terminal session:

```bash
$ docker-compose -f docker-compose.development.yml up
```

If you need to enter the bash of the container, use the following command:

```bash 
$ docker exec -it block-producers-directory-front bash
```

Clean all containers with the following command:

```bash
$ docker rm $(docker ps -a -q) -f
```

Clean all images with the following command:

```bash
$ docker rmi $(docker images -q) -f
```

## Production

To build the project, use the following command:

```bash
$ docker build -t block-producers-directory-front . -f Dockerfile.production
```

To run the project, use the following command. It will start the server and occupate current terminal session:

```bash
$ docker run -p 8080:8080 -e PORT=8080 -e BACK_END_URL='https://bps-directory-back-prod.herokuapp.com' \
    --name block-producers-directory-front block-producers-directory-front
```
