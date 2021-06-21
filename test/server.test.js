'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('POST /test { "string_to_cut": "iamyourlyftdriver" }', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with 200', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { 'string_to_cut': 'iamyourlyftdriver' }
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with {"return_string":"muydv"}', async () => {

        const res = await server.inject({
            method: 'post',
            url: '/test',
            payload: { 'string_to_cut': 'iamyourlyftdriver' }
        });
        expect(res.payload).to.equal('{"return_string":"muydv"}');
    });
});
