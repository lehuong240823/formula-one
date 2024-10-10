const express = require('express');
const app = express();
const path = require('path');
const port = require('./config').port
const circuitRoute = require('./routes/circuitRoute')
const driverRoute = require('./routes/driverRoute')
const scheduleRoute = require('./routes/scheduleRoute')
const resultRoute = require('./routes/resultRoute')
const driverStandingRoute = require('./routes/driverStandingRoute')
const fileRoute = require('./routes/fileRoute')

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html', 'home.html'));
});

app.use(express.json());

app.use('/api', circuitRoute);
app.use('/api', driverRoute);
app.use('/api', scheduleRoute);
app.use('/api', resultRoute);
app.use('/api', driverStandingRoute);
app.use('/api', fileRoute);

app.listen(port, function () {
    const url = `http://localhost:${port}`
    console.log(`Server is running at ${url}`);
    require('child_process').exec(`start ${url}/`);
});


