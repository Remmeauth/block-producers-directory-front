# block-producers-directory-front
Front-end of directory of block producers based around Remme Protocol.

  * [Development](#development)

## Development

Clone the project with the following command:

```bash
$ git clone https://github.com/remmeauth/block-producers-directory-front.git
$ cd block-producers-directory-front
```

To build the project, use the following command:

```bash
$ docker build -t block-producers-directory-front . -f Dockerfile.development
```

To run the project, use the following command. It will start the server and occupate current terminal session:

```bash
$ docker run -p 8080:8080 -v $PWD:/block-producers-directory-front \
    --name block-producers-directory-front block-producers-directory-front
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
