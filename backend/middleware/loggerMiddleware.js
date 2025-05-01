const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname,'..');
const logDirectory = path.join(rootDir, 'logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logFilePath = path.join(logDirectory, 'server.log');

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'] || 'N/A';
    const logMessage = `TIME_OF_REQUEST:${timestamp} --- Request [${method}] [${url}] from IP: ${ip}, User-Agent: ${userAgent}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
};

module.exports = logger;
