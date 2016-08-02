'use strict';

const Hapi   = require('hapi');
const Inert  = require('inert');
const Vision = require('vision');
const ejs    = require('ejs');

const server     = new Hapi.Server();
const connection = { port: process.env.PORT || 1337 };

const routes = [
  {
    method: 'GET',
    path: '/images/{file*}',
    handler: {
      directory: { path: 'public/images' }
    }
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    handler: {
      directory: { path: 'public/js' }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index');
    }
  }
];

function init(err) {
  if (err) {
    throw new Error(err);
  }

  console.log(`Server running at: ${server.info.uri}`);
}

server.connection(connection);
server.register(Vision, (err) => {  
  if (err) {
    console.log('Cannot register vision');
  }

  server.views({
    engines: {
      ejs
    },
    path: `${__dirname}/views`,
    relativeTo: __dirname,
  });
});
server.register(Inert);
server.route(routes);
server.start(init);