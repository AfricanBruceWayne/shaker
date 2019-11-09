const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/shaker-react`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

// Setup Express sessions
if (isDev) {
    // Use FileStore in development
    const FileStore = require('session-file-store')(session);
    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'freudian_Slipped',
        store: new FileStore(),
    }));
} else {
    // Use RedisStore in production mode
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});