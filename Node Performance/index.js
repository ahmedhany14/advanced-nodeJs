const express = require('express')
const cluster = require('cluster'); // to use the cluster module
const crypto = require('crypto')
process.env.UV_THREADPOOL_SIZE = 1; // to change the thread pool size


if (cluster.isMaster) {
    // if we are in the master thread, we will create a new child thread
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    // for more performance, we need to create a child thread for each CPU in the machine VERY IMPORTANT
    // we can create as many child threads as we want
    // we will create a child thread for each CPU in the machine
    // this will make the server faster and more efficient
}
else {
    const app = express();


    function doWork(duration) {
        const start = Date.now();
        while (Date.now() - start < duration) { }
    }

    /*
    Problem description:
    here we have a route that will block the event loop for 5 seconds
    this will cause the event loop to be blocked and no other requests will be served during this time.
    if we have more requests coming in, they will be queued and will be served after the top request in the queue is served.
    */

    app.get('/', (req, res) => {
        //doWork(5000); // this will block the event loop for 5 seconds
        crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
            res.status(200).send('Hi there');
        });

    });

    // although this route is fast, it will not be served until the first request is served
    app.get('/fast', (req, res) => {
        res.status(200).send('This is fast');
    });

    app.get('/fast2', (req, res) => {
        doWork(200);
        res.status(200).send('This is fast2');
    });

    app.listen(3000, () => {
        console.log(`hit http://localhost:3000`);
    });
}