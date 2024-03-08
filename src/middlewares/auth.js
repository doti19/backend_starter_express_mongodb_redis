const passport = require('passport');




const requireJwtAuth = passport.authenticate('jwt', { session: false });


const requireLocalAuth = (req, res, next)=>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(422).send(info);
        }
        req.user = user;
        next();
    })(req, res, next);
}

const checkAuthenticated = (req, res, next) => {
    console.log('req.isAuthenticated()', req.isAuthenticated());
    console.log('req.user', req.user);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect(req.baseUrl + '/login');
};
const checkLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    return next();
};


module.exports = {
    requireJwtAuth,
    requireLocalAuth,
    // checkAuthenticated,
    // checkLoggedIn
};

// const jwt = require('jwt-simple')
// const { jwt } = require('../config')

// /* * call other imported services, or same service but different functions here if you need to
//  */
// const checkAuthToken = async (req, res, next) => {
//    // check header or url parameters or post parameters for token
//    const nonSecurePaths = ['/user/login', '/user/register']
//    if (nonSecurePaths.includes(req.path)) return next()
//    if (
//       req.path.substring(1, 7) == 'public' ||
//       req.path.substring(1, 7) == 'upload'
//    )
//       return next()
//    var token =
//       req.body.token ||
//       req.query.token ||
//       req.headers['Authorization'] ||
//       req.headers['authorization']
//    // decode token
//    try {
//       if (token && token.split(' ').length == 2 && token.split(' ')[1]) {
//          // verifies secret and checks exp
//          token = token.split(' ')[1]
//          var decoded = jwt.decode(token, secret)
//          console.log(decoded) //=> { foo: 'bar' }
//          if (!decoded) {
//             return res.sendStatus(403)
//          } else {
//             req.user = decoded
//             next()
//          }
//       } else {
//          req.errorMessage = 'No Token Provided!'
//          return res.sendStatus(403)
//       }
//    } catch {
//       return res.sendStatus(403)
//    }
// }
// module.exports = {
//    checkAuthToken,
// }
