const express = require('express');
const httpProxy = require('express-http-proxy');
const productRoutes = express.Router();

productRoutes.post('/buy', async (req, res, next) => {
    const productServiceProxy = httpProxy(req.productsUrl);
    productServiceProxy(req, res, next)
})

productRoutes.post('/product', async (req, res, next) => {
    const productServiceProxy = httpProxy(req.productsUrl);
    productServiceProxy(req, res, next)
})

productRoutes.get('/product', async (req, res, next) => {
    const productServiceProxy = httpProxy(req.productsUrl);
    productServiceProxy(req, res, next)
})

productRoutes.get('/product/:id', async (req, res, next) => {
    const productServiceProxy = httpProxy(req.productsUrl);
    productServiceProxy(req, res, next)
})

module.exports = productRoutes;