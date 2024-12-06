const mongoose = require('mongoose');

const client = require('./../cache.conf');
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
    // this function will make the query cacheable it make sure that not all queries are cached to save memory
    this.CACHE = true;
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
    const cacheValue = await client.get(key); // get the value from cache
    if (cacheValue) return JSON.parse(cacheValue); // if cache value exists , return it        

    console.log('Cache Missed');
    const queryResult = await exec.apply(this, arguments);
    await client.set(key, JSON.stringify(queryResult)); // set the value in cache

    return queryResult// return the value
}


exports.clearCache = async (key) => {
    console.log('Clearing cache');
    await client.del(key);
}