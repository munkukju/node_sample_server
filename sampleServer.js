
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

http.createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // 여기서부터 새로운 부분입니다.

        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
// 주의: 위 두줄은 다음 한줄로 대체할 수도 있습니다.
// response.writeHead(200, {'Content-Type: 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();

// 주의: 위 두줄은 다음 한줄로 대체할 수도 있습니다.
// response.end(JSON.stringify(responseBody))

// 새로운 부분이 끝났습니다.
    });
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });