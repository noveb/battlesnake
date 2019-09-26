const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const {
    fallbackHandler,
    notFoundHandler,
    genericErrorHandler,
    poweredByHandler,
} = require('./handlers');

const Game1 = require('./game-v1');
const Game2 = require('./game-v2');

const app = express();

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001));

app.enable('verbose errors');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
    // NOTE: Do something here to start the game

    // Response data
    const data = {
        color: '#000000',
        headType: 'pixel',
        tailType: 'pixel',
    };

    return response.json(data);
});

// Handle POST request to '/move'
app.post('/move', (request, response) => {
    // NOTE: Do something here to generate your move
    try {
        const myGame2 = new Game2(request.body);

        let move = myGame2.nextMoveFood(true);
        console.log(`Turn: ${request.body.turn}: myGame2.nextMoveFood: avoidSnakes`, move);

        if (move === undefined) {
            move = myGame2.nextMoveTail(true);
            console.log(`Turn: ${request.body.turn}: myGame2.nextMoveTail avoidSnakes: `, move);
        }
        if (move === undefined) {
            move = myGame2.nextMoveFood(false);
            console.log(`Turn: ${request.body.turn}: myGame2.nextMoveFood: `, move);
        }
        if (move === undefined) {
            move = myGame2.nextMoveTail(false);
            console.log(`Turn: ${request.body.turn}: myGame2.nextMoveTail: `, move);
        }
        if (move === undefined) {
            const myGame1 = new Game1(request.body);
            move = myGame1.nextMoveRandom();
            console.log(`Turn: ${request.body.turn}: myGame1.nextMoveRandom: `, move);
        }

        return response.json(move);
    } catch (error) {
        console.error(error);
        return response.statusCode(500);
    }
});

// eslint-disable-next-line arrow-body-style
app.post('/end', (request, response) => {
    // NOTE: Any cleanup when a game is complete.
    return response.json({});
});

app.post('/ping', (request, response) => response.json({}));

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
    console.log('Server listening on port %s', app.get('port'));
});
