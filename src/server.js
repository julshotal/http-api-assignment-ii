const http = require('http');
const url = require('url');
const query = require('querystring');

const html = require('./htmlResponses.js');
const json = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk); 
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      json.addUser(request, res, bodyParams);
    });
  } else {
    json.notReal(request, response);
  }
};

const urlStruct = {
  GET: {
    '/': html.getIndex,
    '/style.css': html.getCSS,
    '/getUsers': json.getUsers,
    '/notReal': json.notReal,
  },
  HEAD: {
    '/getUsers': json.headUsers,
    '/notReal': json.headNotReal,
  },
  POST: {
    '/addUser': handlePost,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if(urlStruct[request.method][parsedUrl.pathname]){
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    console.log('error');
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
