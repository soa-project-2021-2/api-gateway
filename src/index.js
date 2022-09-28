const express = require('express');
const usersRoute = require('./Routes/userRoutes');
const productRoute = require('./Routes/productRoutes');
const PORT = 3200;
const app = express({ port: PORT });
const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
const eurekaPort = 9090;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '172.0.0.1';
const cors = require('cors');

const client = new Eureka({
    instance: {
        app: 'api-gateway',
        hostName: hostName,
        ipAddr: ipAddr,
        port: {
            '$': PORT,
            '@enabled': 'true',
        },
        vipAddress: 'api-gateway',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    //retry 10 time for 3 minute 20 seconds.
    eureka: {
        host: eurekaHost,
        port: eurekaPort,
        servicePath: '/eureka/apps/',
        maxRetries: 10,
        requestRetryDelay: 2000,
    },
})
client.start(error => {
    console.log(error || "service registered")
});

client.on('started', () => { })

app.use(cors())
app.use((req, res, next) => {
    const userUrl = client.getInstancesByAppId('USER-SERVICE')
    req.userUrl = "localhost" + ':' + userUrl[0].port.$;

    const productsUrl = client.getInstancesByAppId('PRODUCT-SERVICE')
    req.productsUrl = "localhost" + ':' + productsUrl[0].port.$;
    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(usersRoute)
app.use(productRoute)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
