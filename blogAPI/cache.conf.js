const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

(async () => {
    try {
        await client.connect(); // connect to Redis
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

async function test() {
    try {
        await client.set('ping', 'pong');
        console.log('\x1b[34m%s\x1b[0m', 'test passed');
    } catch (error) {
        console.error('Error during Redis operation:', error);
    }
}

test();

module.exports = client;
