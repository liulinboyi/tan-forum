'use strict';

const Hapi = require('hapi');
require('./mongoose/db');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const hapiBoomDecorators = require('hapi-boom-decorators');



const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
        cors: {
            origin: [
                '*'
            ],
            headers: ["Access-Control-Allow-Headers", "Access-Control-Allow-Origin","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
            additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
            credentials: true
        },
    }

});

// api 插件
const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: '1.0',
    },
};



// good 插件
const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            },
            {
                module: 'good-console'
            },
            'stdout'
        ]
    }
};
const dbConnect = {
    url: 'mongodb://localhost:27017/tan_forum',
    settings: {
        poolSize: 10
    },
    decorate: true
};


const init = async () => {
                                    //连接数据库
    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbConnect
    });

    await server.register({     //日志插件
        plugin: require('good'),
        options,
    });
    await server.register(require('hapi-auto-route'));    //路由插件

    await server.register(hapiBoomDecorators); // boom 插件

    await server.register([    //api 插件
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
