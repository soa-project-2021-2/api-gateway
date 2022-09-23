const express = require('express');
const httpProxy = require('express-http-proxy');
const PORT = 3200;
const app = express({port: PORT});
const discovery = require('./discovery');
const client = discovery.registerWithEureka('api-gateway', PORT)
console.log('client', client)
// const {
//   USERS_API_URL,
//   PRODUCTS_API_URL,
// } = require('./URLs');

// const userServiceProxy = httpProxy(USERS_API_URL);
// const productsServiceProxy = httpProxy(PRODUCTS_API_URL);

// app.get('/', (req, res) => res.send('Hello Gateway API'));

// app.get('/users', (req, res, next) => userServiceProxy(req, res, next));
// app.get('/products', (req, res, next) => productsServiceProxy(req, res, next));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

const algo = client.getInstancesByAppId('USER-SERVICE')
console.log('oi', algo)

const algo2 = client.getInstancesByAppId('USER-SERVICE')
console.log('oi', algo)