/*
as common in nodeJs, that it is a singel threaded, but it is not true, nodeJs is a single threaded, but it uses multiple threads to execute the code, and the main thread is the event loop

event loop is the main thread that is responsible for executing the code, and it is responsible for the following:
- timers
- pendingOSTasks
- pendingOperations
- setImmediate
- close events

framwork like expressJs, and crypto module excuted as a multiple threads, and the main thread is the event loop
*/

const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
});


crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start);
});

/*
output:
3: 518
2: 528
1: 529

as you see that the 3 tasks take almost the same time.
and if nodeJs is a single threaded, the 3 tasks should be executed one after the other, but it is not true, the 3 tasks are executed
*/


/*
node's c++ side provides a thread pool that is used to perform computationally expensive tasks like encryption, decryption, compression, etc.
it's provide 4 threads by default, but you can change it by setting the environment variable UV_THREADPOOL_SIZE

Now if we run the same code but with 7 tasks, we will see that the first 4 tasks will be executed first, and then the other 3 tasks will be executed
*/

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start);
});

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start);
});

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('6:', Date.now() - start);
});

crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log('7:', Date.now() - start);
});

/*
Now output:
1: 515
4: 524
2: 525
3: 527

5: 1033
7: 1039
6: 1041
*/