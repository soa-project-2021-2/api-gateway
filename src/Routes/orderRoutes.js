const express = require('express');
const httpProxy = require('express-http-proxy');
const orderRoutes = express.Router();

orderRoutes.post('/api/order', async (req, res, next) => {
    const orderServiceProxy = httpProxy(req.orderUrl);
    orderServiceProxy(req, res, next)
})

orderRoutes.patch('/api/order/:id/updateStatus', async (req, res, next) => {
    const orderServiceProxy = httpProxy(req.orderUrl);
    orderServiceProxy(req, res, next)
})

orderRoutes.get('/api/order', async (req, res, next) => {
    const orderServiceProxy = httpProxy(req.orderUrl);
    orderServiceProxy(req, res, next)
})

orderRoutes.get('/api/order/:id', async (req, res, next) => {
    const orderServiceProxy = httpProxy(req.orderUrl);
    orderServiceProxy(req, res, next)
})

orderRoutes.get('/api/order/user/:userId', async (req, res, next) => {
    const orderServiceProxy = httpProxy(req.orderUrl);
    orderServiceProxy(req, res, next)
})

module.exports = orderRoutes;