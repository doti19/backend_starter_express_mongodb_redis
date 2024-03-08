const jwt = require('jsonwebtoken');
const {jwt_token: token} = require('../config/config');
const client = require('../config/redis');
const {UserToken} = require('../api/models');

const signAccessToken = async userId => {
    return jwt.sign({id: userId}, token.access.secret, {expiresIn: token.access.expiresIn});
};

const signRefreshToken = async userId => {
    
    const signedToken= jwt.sign({id: userId}, token.refresh.secret, {expiresIn: token.refresh.expiresIn});
    console.log("signed token", signedToken);
    await client.set(userId, signedToken, {
        EX: token.refresh.expiresIn,
    });
    return signedToken;
}

const verifyAccessToken= async token =>{
    try{
        const user = await jwt.verify(token, token.access.secret);
        return user;
    } catch(error){
        return null;
    }
}

const verifyRefreshToken = async refreshToken => {
    try{
        
        const verified =  jwt.verify(refreshToken, token.refresh.secret);
        
        if(!verified) return {error: true, token: null, message: "Invalid refresh token"};
        const userToken = await UserToken.findOne({
            token: refreshToken
        });

        if(!userToken) return {error: true, token: null, message: "refresh token not found"};
        
        return {error: false, token: userToken, message: "refresh token verified"};
    } catch(error){
        
        return {error: true, token: null, message: error};
    }
};


module.exports = {
    // signAccessToken,
    // signRefreshToken,
    // verifyAccessToken,
    verifyRefreshToken,
};