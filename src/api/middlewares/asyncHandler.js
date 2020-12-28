
/**
 * 
 * this file catches all async errors & throw to Express error handler
 * 
 */


module.exports = fn => (req, res, next) => {

    Promise.resolve(fn(req, res, next)).catch(next)

}