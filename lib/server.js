'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');



const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello World!';
    }
});

server.route({
    method: 'POST',
    path: '/test',
    handler: (request, h) => {

        const string_to_cut = request.payload.string_to_cut;
        let result = '';
        let letterCount = 0;

        for (let i = 0; i < string_to_cut.length; ++i) { // iterate over string_to_cut
            if (string_to_cut[i] >= 'A' && string_to_cut[i] <= 'z') { // if current character is a letter, add 1 to letterCount
                letterCount += 1;
                if (letterCount % 3 === 0) { // if 3rd letter, add the letter to the result string
                    result += string_to_cut[i];
                }
            }
        }

        return { return_string: result };
    },
    options: {
        auth: false,
        validate: {
            payload: Joi.object({
                string_to_cut: Joi.string().allow('')
            })
        }
    }
});

exports.init = async () => {

    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});