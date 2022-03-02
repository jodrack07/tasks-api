const express = require('express');
const path = require('path');
const { DBConnection } = require('./db/connect');
require('dotenv').config();
// custom error handler
const errorHandler = require('./middlewares/errorHandler');

// routers
const tasksRouter = require('./routes/tasks.rt');

const app = express();

// PORT
const PORT =process.env.PORT || 3000;

// static files
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use(errorHandler);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// make the server listening only when the DB has been connected successfully
const launchAPI = async () => {
    try {
        await DBConnection(process.env.MONGODB_URI, { useNewUrlParser: true });
        console.log('Connected...');
        app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}...`));
    } catch (error) {
        console.log('Error : ', error);
    }
}

launchAPI();
