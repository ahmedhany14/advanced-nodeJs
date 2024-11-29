/*
as we see thread pool provides 4 threads, so the first 4 tasks will be executed first
but we can change the number of threads by setting the environment variable UV_THREADPOOL_SIZE
*/

process.env.UV_THREADPOOL_SIZE = 7;

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
2: 534
7: 540
1: 540
4: 540
5: 541
3: 732
6: 734


before: 
3: 517
4: 523
1: 529
2: 540
5: 1039
6: 1040
7: 1052
*/