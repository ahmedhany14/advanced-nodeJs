const mongoose = require('mongoose');

const client = require('./../cache.conf');
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
    // this function will make the query cacheable it make sure that not all queries are cached to save memory
    this.CACHE = true;
    this.hashKey = JSON.stringify(options.key || 'default'); // create a hash key for the query

    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.CACHE) {
        console.log('Not Caching');
        return exec.apply(this, arguments);
    }

    console.log('Caching');

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    // const cacheValue = await client.get(key) // get the value from cache, single key
    const cacheValue = await client.hget(this.hashKey, key) // get the value from cache, nested key

    if (cacheValue) return JSON.parse(cacheValue); // if cache value exists , return it        

    console.log('Cache Missed');
    const queryResult = await exec.apply(this, arguments);

    // set the cache expiration time to .5 minutes
    const cacheExpiration = 10;
    // client.set(key, JSON.stringify(queryResult), 'EX', cacheExpiration); // set the value in cache, single key
    await client.hset(this.hashKey, key, JSON.stringify(queryResult)); // set the value in cache, nested key
    await client.expire(this.hashKey, cacheExpiration); // set the expiration time for the hash key

    console.log(await client.ttl(this.hashKey));
    return queryResult// return the value
}


exports.clearCache = async (id) => {
    console.log('Clearing cache');
    // await client.del(JSON.stringify(key)); // single key
    //await client.hdel(JSON.stringify(id), key); // nested key
    await client.del(id); // clear the cache for the user
}