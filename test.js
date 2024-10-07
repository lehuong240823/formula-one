const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/circuit',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
