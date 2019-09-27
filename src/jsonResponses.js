const userInfo = {};

const respond = (request, response, status, user) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(user));
  response.end();
};

const respondEmpty = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    userInfo,
  };

  return respond(request, response, 200, responseJSON);
};

const headUsers = (request, response) => respondEmpty(request, response, 200);

const notReal = (request, response) => {
  const responseJSON = {
    message: '404 Error',
    id: 'doesNotExist',
  };

  return respond(request, response, 404, responseJSON);
};

const headNotReal = (request, response) => respondEmpty(request, response, 404);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Please enter the required information',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParameters';
    return respond(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (userInfo[body.name]) {
    responseCode = 204;
  } else {
    userInfo[body.name] = {};
  }

  userInfo[body.name].name = body.name;
  userInfo[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respond(request, response, responseCode, responseJSON);
  }

  return respondEmpty(request, response, responseCode);
};

module.exports = {
  getUsers,
  notReal,
  headUsers,
  headNotReal,
  addUser,
  notFound,
};
