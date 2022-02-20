# [<img src="assets/2Color_Black_360x.webp" alt="Battlesnake" width="600" height="150">](https://play.battlesnake.com/)

This is my snake for the AI competition [Battlesnake](https://play.battlesnake.com) and pretty successful. It reached rank 39 and  in the [Global Arena](https://play.battlesnake.com/arena/global/) versus ~550 opponents on Saturday 2/19/2022.

![Battlesnake Global Arena ranking](assets/BS-GA-Banner.png)

## Battlesnake - about the game

> Battlesnake is an autonomous survival game. Each Battlesnake is controlled autonomously by a live web server and moves independently attempting to find food, avoid other Battlesnakes, and stay alive as long as possible.

from [Battlesnake docs](https://docs.battlesnake.com/)

[![alt](/assets/bs-game-63af0120-5776-4c30-8bef-e5285453065.gif)](https://play.battlesnake.com/g/63af0120-5776-4c30-8bef-e5285453065c/)
[![alt](/assets/bs-game-5d87d199-2e08-45e6-a5b7-bf23d4f0fa06.gif)](https://play.battlesnake.com/g/5d87d199-2e08-45e6-a5b7-bf23d4f0fa06/)
[![alt](/assets/bs-game-90d77bc5-1eb4-4ba4-8b40-1258ffcde006.gif)](https://play.battlesnake.com/g/90d77bc5-1eb4-4ba4-8b40-1258ffcde006/)

---
## Prerequisites

* [Docker](https://www.docker.com/products/docker-desktop) and [docker-compose](https://docs.docker.com/compose/)
* [NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)

## Installation and start

1. Clone the repo

    ```bash
    git clone https://github.com/noveb/battlesnake.git
    ```

2. Install development dependencies

    Most things can be done in/with Docker but it is still useful to install the dependencies and needed for the git hooks. 
    
    ```bash
    npm install
    ```

3. Build Docker image for development

    ```bash
    docker-compose build
    ```

4. Run the Docker container for development

    ```bash
    docker-compose up
    ```

## Usage

There are various options and docker-compose files to run this for different purposes:

1. TDD with live games

    The default d-c file `docker-compose.yml` starts the server and restarts on file changes. Use this to make changes and verify in live games.

    ```bash
    docker-compose up [--build]
    ```

2. TDD with unit / integration tests

    The d-c file `docker-compose.test.yml` does not start the server but runs `jest --watch` for test driven development. Useful when writing algorithms and strategies.

    ```bash
    docker-compose --file docker-compose.test.yml up [--build]
    ```

3. Production & beta

    The d-c file `docker-compose.production.yml` and `docker-compose.beta-test.yml` are almost equal but use different ports. The image and container are optimized for production (no dev dependencies & tools, proper tsc build, ...). Beta can be used to test updates and verify that they are better or experiment with new game modes without risk for the ranking of your main snake.

    ```bash
    docker-compose --file docker-compose.production.yml up [--build]

    docker-compose --file docker-compose.production.yml up [--build]
    ```

## Database and save games

In the d-c stack is [MongoDB](https://hub.docker.com/_/mongo) and [mongo-express](https://github.com/mongo-express/mongo-express-docker) included. The API will save every game and game step for later debugging. A game step can be replayed with Postman or curl. The database is not needed to play games.

## Acknowledgments

Special thanks to [Xueqiao (Joe) Xu](https://github.com/qiao) and his [PathFinding.js](https://github.com/qiao/PathFinding.js) package. It is used to find shortest paths to food and other targets.

## Useful tools and resources

* [Mojave](https://github.com/smallsco/mojave)
* [Battlesnake Tester](https://github.com/jfgodoy/battlesnake-tester)