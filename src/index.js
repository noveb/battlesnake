const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const {
    fallbackHandler,
    notFoundHandler,
    genericErrorHandler,
    poweredByHandler,
} = require('./handlers');

// const connectDb = require('./db-connection');
// const GameData = require('./gameData.model');
const MoveController = require('./move.controller');

const app = express();

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001));

app.enable('verbose errors');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// connectDb().then(() => {
//     console.log('MongoDb connected');
// });

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
    // const game = new GameData(request.body);
    // game.save().then().catch((error) => console.error(error));

    const move = new MoveController(request, response);
    move.move();
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
