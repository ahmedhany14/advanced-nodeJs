const express = require('express')
const crypto = require('crypto')
process.env.UV_THREADPOOL_SIZE = 1;
/*

to demonestrate the power of the cluster module, we will use the pm2 module
pm2 start indexPM2.js -i 0

to stop the server
pm2 stop indexPM2.js

to delete the server
pm2 delete indexPM2.js

to restart the server
pm2 restart indexPM2.js

to see the logs for the server
pm2 logs indexPM2.js
*/

const app = express();


function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) { }
}
app.get('/', (req, res) => {
    crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
        res.status(200).send('Hi there');
    });

});

app.get('/fast', (req, res) => {
    res.status(200).send('This is fast');
});

app.get('/fast2', (req, res) => {
    doWork(200);
    res.status(200).send('This is fast2');
});

app.get('/hello', (req, res) => {
    res.status(200).send('Hello');
});

app.listen(3000, () => {
    console.log(`hit http://localhost:3000`);
    console.log('Application is running...');

});