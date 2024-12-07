const clearCache = require('./../service/cache').clearCache;



exports.clearMW = async (req, res, next) => {
    await next();
    clearCache(req.user.id);
}