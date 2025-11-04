const dotenv=require('dotenv');

dotenv.config({path:"D:\\catalyst\\canadianlic\\client\\app\\src\\.env"});

module.exports = {
    // publicPath: process.env.MODE === 'production'
    //   ? `${process.env.baseURI}/server/`
    //   : `${process.env.devURI}/server/`
    publicPath:process.env.baseURI
     }

