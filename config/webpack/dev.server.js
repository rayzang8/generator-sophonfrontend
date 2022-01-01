const ip = require('ip');

const devPort = 9898;

const federationName = 'sophon';

const portalServer = 'https://172.26.0.130:8066';

const proxyHeaders = {
    'X-Forwarded-Proto': 'https',
    'X-Forwarded-For': ip.address(),
    'X-Forwarded-port': devPort,
    'Connection': 'Keep-Alive'
};

const websocketProxyUrl = 'http://172.26.0.130:8700'.replace(/:(\d+)?$/, `:${8720}`);

const reverseProxy = {
    '/gateway/socket.io': {
        pathRewrite: { '^/gateway': '' },
        target: websocketProxyUrl,
        secure: false,
        changeOrigin: true,
        ws: true,
        headers: {
            'X-Forwarded-Proto': 'https',
            'X-Forwarded-For': 8720,
            Upgrade: '$http_upgrade',
            Connection: 'upgrade'
        }
    },
    '/gateway': {
        target: 'http://172.26.0.130:8700',
        proxyTimeout: 1000 * 60 * 60,
        timeout: 1000 * 60 * 60,
        secure: false,
        changeOrigin: false,
        headers: proxyHeaders,
    },
    '/api': {
        target: 'http://172.26.0.130:8700',
        secure: false,
        logLevel: 'debug',
        headers: proxyHeaders,
    },
    
};

module.exports = {
    devPort,
    proxyHeaders,
    reverseProxy,
    federationName,
    portalServer
};
