const net = require('node:net')
const http = require('node:http')

function findAvaiablePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(desiredPort, () => {
            const { port } = server.address();

            server.close(() => {
                resolve(port);
            })
        })

        server.on('error', (error) => {
            if (error.code === "EADDRINUSE") {
                findAvaiablePort(0).then(port => resolve(port));
            } else {
                reject(error);
            }
        })
    })
}

const server = http.createServer((req, res) => {
    console.log('request received');
    res.end('Hola Mundo');
})

findAvaiablePort(1234).then(port => {
    server.listen(port, () => {
        console.log(`server listening on port http://localhost:${port}`)
    })
})

