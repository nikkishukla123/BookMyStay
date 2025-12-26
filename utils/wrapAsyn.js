


module.exports = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next)
    };
};

//Route
//  → wrapAsync
//  → next(err)
//  → error middleware
//  → response sent
