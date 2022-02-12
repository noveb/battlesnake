# Battlesnake

## Docker

### Build

```
~/Git/battlesnake/battlesnake (master)
$ docker build -t noveb0/battlesnake:0.3.1 -t noveb0/battlesnake:latest ./src/
```

### Push

```
docker push noveb0/battlesnake:0.3.1 && docker push noveb0/battlesnake:latest
```

### Run 

```

```

## Windows - WSL setup
Docker proxies ports from Windows to WSL, no manual setup necessary.
For use without docker, traffic has to be proxied from Windows to WSL with IPv6 interface.

```
$ netsh interface portproxy add v6tov6 listenport=9000 listenaddress=:: connectport=9000 connectaddress=fe80::215:5dff:fedd:2d87

$ netsh interface portproxy show all#

$ netsh interface portproxy delete v6tov6 listenport=9000 listenaddress=::
```