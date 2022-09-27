const express = require('express');
const httpProxy = require('express-http-proxy');
const usersRoute = express.Router();


usersRoute.get('/users', async (req, res, next) => {
    const userServiceProxy = httpProxy(req.userUrl);
    userServiceProxy(req, res, next)
})

usersRoute.get('/users/:uuid', async (req, res, next) => {
    const userServiceProxy = httpProxy(req.userUrl);
    userServiceProxy(req, res, next)
});

usersRoute.post('/users', async (req, res, next) => {
    const userServiceProxy = httpProxy(req.userUrl);
    userServiceProxy(req, res, next)
});

usersRoute.put('/users/:uuid', async (req, res, next) => {
    const userServiceProxy = httpProxy(req.userUrl);
    userServiceProxy(req, res, next)
});

usersRoute.post('/login', async (req, res, next) => {
    const userServiceProxy = httpProxy(req.userUrl);
    userServiceProxy(req, res, next)

})

usersRoute.post('/token', (req, res, next) => {
    const userServiceProxy = httpProxy(req.userUrl);
    userServiceProxy(req, res, next)
})


module.exports = usersRoute;