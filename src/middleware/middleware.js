const cleaner = require('../helper/cleaner.js')
const Sandbox = require ('../model/sandbox.js')

const preExec = async function (req, res, next) {

    console.log('req url = ' + req.url)
    console.log('req method = ' + req.method)

    // if ((req.url == '/') 
    // || ((req.url === '/books') && (req.method === 'GET')) 
    // || (req.url === '/favicon.ico') 
    // || (req.url.includes('.css') 
    // || (req.url.includes('.js')))){ 
    //     next();
    //     return;
    // }
  
    cleaner()
  
    const authHeader = req.headers.authorization
    console.log("authHeader = " + authHeader)
    let token

    if (!authHeader) {
        console.log("Unathenticated request - ignoring")
        res.status(401).send()
        return
    }
  
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.replace('Bearer ', '');
        await Sandbox.find({ apikey: token }).countDocuments((error, count) => {
            if (count === 0){
                res.status(401).send()
            } else {
                next();
            }
        });
    } else {
        res.status(401).send()
    }
}

module.exports = preExec;