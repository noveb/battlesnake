const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios').default;

const connectDb = require('./db-connection');
const GameData = require('./gameData.model');

const app = express();

app.set('port', (process.env.PORT || 9001));

app.enable('verbose errors');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('view engine', 'pug');

connectDb().then(() => {
    console.log('MongoDb connected');
});

app.get('/', async (request, response) => {
    const games = await GameData.find({})
        .select('game.id')
        .distinct('game.id');

    return response.render('games', { games: games });

    return response.json(games);
    // const compiledFunction = pug.compileFile('./views/games.pug');
});

app.get('/game/:gameId', async (request, response) => {
    const gameId = request.params.gameId;
    const turnsObj = await GameData.find({ 'game.id': gameId })
        .select('-_id turn').sort({ turn: -1 });
    const turnsNum = turnsObj.map( x => x.turn);

    return response.render('turns', { game: gameId, turns: turnsNum });

    return response.json(games);
    // const compiledFunction = pug.compileFile('./views/games.pug');
});

app.get('/game/:gameId/turn/:turnId', async (request, response) => {
    const gameId = request.params.gameId;
    const turnId = parseInt(request.params.turnId);
    const turn = await GameData.findOne({ 'game.id': gameId, turn: turnId });

    const move = await axios.post('http://api:5000/move', turn);
    console.log(move.data);

    return response.redirect(`/game/${gameId}`);
    // const compiledFunction = pug.compileFile('./views/games.pug');
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port %s', app.get('port'));
});
