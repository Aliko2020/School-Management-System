const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip; 
    const userAgent = req.headers['user-agent'] || 'N/A'; 

    console.log(`${timestamp} --- Request [${method}] [${url}] from IP: ${ip}, User-Agent: ${userAgent}`);
    next();
};

module.exports = logger