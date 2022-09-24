const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = (process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1');
const eurekaPort = 9090;
const hostName = (process.env.HOSTNAME || 'localhost')
const ipAddr = '172.0.0.1';

let serviceCLient;

exports.registerWithEureka = async function (appName, PORT) {
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                '$': PORT,
                '@enabled': 'true',
            },
            vipAddress: appName,
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
        console.log(error || "user service registered")
    });

    client.on('started', () => {
        serviceCLient = client

    })

    // client.logger.level('debug')

    // function exitHandler(options, exitCode) {
    //     if (options.cleanup) {
    //     }
    //     if (exitCode || exitCode === 0) console.log(exitCode);
    //     if (options.exit) {
    //         client.stop();
    //     }
    // }

    // client.on('deregistered', () => {
    //     process.exit();
    //     console.log('after deregistered');
    // })


    // client.on('heartbeat', ()=>{
    //   const algo = client.getInstancesByAppId('USER-SERVICE')
    //   console.log('oi', algo)
    // })

    // process.on('SIGINT', exitHandler.bind(null, {exit:true}));
};

exports.serviceCLient