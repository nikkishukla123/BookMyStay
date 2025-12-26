
// for handling custom express error
//ExpressError.js only creates the error object. The error is forwarded directly to Express’s error-handling middleware using next(err)

class ExpressError extends Error{
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message
    }
}

module.exports = ExpressError


//flow diagram
//Request (/abc)
    //↓
// No route matched
//    ↓
// 404 middleware
//    ↓
// new ExpressError() Sirf error object banata hai
//    ↓
// next(err)
//    ↓
// Error-handling middleware
//    ↓
// Response sent
